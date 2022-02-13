const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");
const { parse: htmlParser } = require("node-html-parser");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function scrapeBto(link) {
  const response = await fetch(link, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    },
  });

  const body = await response.text();
  const root = htmlParser(body);

  const output = {};
  root.querySelectorAll('img[src^="../images/col"]').forEach((img) => {
    const val = img._attrs.src.replace("../images/col", "").replace(".gif", "");
    output[`habitat.${img._attrs.title}`] = parseInt(val, 10);
  });

  const eurobirdLink = root.querySelector('a[href^="https://eurobirdportal"]')
    ?._attrs.href;

  const foundInRow = root.querySelector(
    'tr > td > a[href^="http://www.bto.org/about-birds/birdfacts/about-birdfacts/key-facts#habitat"]'
  );

  const foundIn =
    foundInRow?.parentNode?.parentNode?.querySelector("td:last-child");

  const otherName = root.querySelector(
    'img[title="Other names the species is known by, sometimes in other parts othe world"] + strong'
  );

  return {
    ...output,
    eurobirdLink,
    foundIn: foundIn?.childNodes[0]?._rawText
      .replace("\r\n", "")
      .replace("\r\n", ""),
    otherName: otherName?.childNodes?.[0]._rawText.replace(
      "Also known as ",
      ""
    ),
  };
}

async function main() {
  const csvPath = path.join(__dirname, "./data/db.csv");
  const contents = fs.readFileSync(csvPath, "utf8");

  const records = parse(contents, {
    columns: true,
    skip_empty_lines: true,
  });

  const output = [];

  const columns = [];

  for (const record of records) {
    if (record.Link) {
      console.log("Processing :: ", record.Name, record.Link);

      const habitatInfo = await scrapeBto(record.Link);
      console.log("🔥 ➡️ HERE:", habitatInfo);
      const row = { ...record, ...habitatInfo };
      Object.keys(row).forEach((key) => {
        if (!columns.includes(key)) {
          columns.push(key);
        }
      });
      output.push(row);

      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  fs.writeFileSync(
    path.join(__dirname, "./data/db-out.csv"),
    stringify(output, { header: true, columns })
  );
}

main();
