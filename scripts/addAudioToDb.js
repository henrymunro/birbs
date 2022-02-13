const fs = require("fs");
const path = require("path");

const DATABASE_FILE = path.join(__dirname, "../src/database/database.json");
const AUDIO_FILE = path.join(__dirname, "./data/audio.json");

const db = JSON.parse(fs.readFileSync(DATABASE_FILE, "utf8"));
const audioDb = JSON.parse(fs.readFileSync(AUDIO_FILE, "utf8"));

Object.entries(db).forEach(([key, value]) => {
  const keyName = value.name;

  const audio = audioDb[keyName];
  if (!audio) {
    console.log(`No audio for ${keyName}`);
    return;
  }

  db[key].audio = audio.map((a) => ({
    path: a.file,
    type: a.type,
    length: a.length,
  }));
});

fs.writeFileSync(DATABASE_FILE, JSON.stringify(db, null, 2));
