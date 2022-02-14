const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const csvPath = path.join(__dirname, "./data/db.csv");
const contents = fs.readFileSync(csvPath, "utf8");

const DATABASE_FILE = path.join(__dirname, "../src/database/database.json");

const records = parse(contents, {
  columns: true,
  skip_empty_lines: true,
});

const habitatNames = Object.keys(records[0]).filter((i) =>
  i.startsWith("habitat.")
);

const database = JSON.parse(fs.readFileSync(DATABASE_FILE, "utf8"));

records.forEach((r) => {
  if (!database[r.Name]) {
    database[r.Name] = {};
  }

  const images = database[r.Name].images || [];

  const image1 = r["Image Url"];
  const image2 = r["2nd Image"];
  if (image1 && !images.includes(image1)) {
    images.push(image1);
  }
  if (image2 && !images.includes(image2)) {
    images.push(image2);
  }

  const habitats = {};

  habitatNames.forEach((h) => {
    if (r[h]) {
      habitats[h.replace("habitat.", "")] = parseInt(r[h], 10);
    }
  });

  database[r.Name] = {
    statusInBritain: r["Status in Britain"],
    eurobirdLink: r.eurobirdLink,
    foundIn: r.foundIn,
    habitats: Object.keys(habitats).length > 0 ? habitats : undefined,
    populationNumber: parseInt(r["Population Number"].replace(/,/g, ""), 10),
    ...database[r.Name],
    images,
    longName: r["Updated Name"] || r.Name,
    name: r.Name,
  };
});

fs.writeFileSync(DATABASE_FILE, JSON.stringify(database, null, 2));
fs.writeFileSync(
  "./data/species.json",
  JSON.stringify(
    Object.keys(database).map((k) => database[k].name),
    null,
    2
  )
);
