const fs = require("fs");
const path = require("path");

const DATABASE_FILE = path.join(__dirname, "../src/database/database.json");

const db = JSON.parse(fs.readFileSync(DATABASE_FILE, "utf8"));

const output = [];

Object.keys(db).forEach((bird) => {
  output.push({
    key: bird,
    name: db[bird].name,
  });
});
