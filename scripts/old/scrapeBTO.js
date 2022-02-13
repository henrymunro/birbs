const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { parse } = require("node-html-parser");
const fs = require("fs");

async function main() {
  const url = "http://app.bto.org/birdfacts/results/bob4290.htm";

  const output = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    },
  });

  const body = await output.text();

  //   fs.writeFileSync("body.html", body);

  const root = parse(body);

  const habitats = {};

  root.querySelectorAll('img[src^="../images/col"]').forEach((img) => {
    const val = img._attrs.src.replace("../images/col", "").replace(".gif", "");
    habitats[img._attrs.title] = parseInt(val, 10);
  });

  const eurobirdLink = root.querySelector('a[href^="https://eurobirdportal"]')
    ?._attrs.href;

  const foundInRow = root.querySelector(
    'tr > td > a[href^="http://www.bto.org/about-birds/birdfacts/about-birdfacts/key-facts#habitat"]'
  );

  const foundIn =
    foundInRow?.parentNode?.parentNode?.querySelector("td:last-child");

  const a = root.querySelector(
    'img[title="Other names the species is known by, sometimes in other parts othe world"] + strong'
  );
  //   console.log("🔥 ➡️ HERE:", foundInRow.parentNode.parentNode);
  console.log(
    "🔥 ➡️ HERE:",
    a.childNodes?.[0]._rawText.replace("Also known as ", "")
  );

  console.log("🔥 ➡️ HERE:", {
    foundIn: foundIn?.childNodes[0]?._rawText
      .replace("\r\n", "")
      .replace("\r\n", ""),
    eurobirdLink,
    habitats,
    
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
