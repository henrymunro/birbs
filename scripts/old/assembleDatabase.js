const fs = require("fs");
const path = require("path");

const AUDIO_DATABASE_FILE = path.join(
  __dirname,
  "../src/database/audio-database.json"
);
const DATABASE_FILE = path.join(__dirname, "../src/database/database.json");

const audioDb = JSON.parse(fs.readFileSync(AUDIO_DATABASE_FILE, "utf8"));
const db = JSON.parse(fs.readFileSync(DATABASE_FILE, "utf8"));

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

Object.keys(audioDb).forEach((bird) => {
  if (!db[bird]) {
    db[bird] = {
      name: toTitleCase(bird.replace(/-/g, " ")),
      grouping: [],
      images: [{ path: `${bird}-0.png` }],
      audio: audioDb[bird].map((r) => ({
        path: r.xenoCantoData.file,
        type: r.xenoCantoData.type,
        length: r.xenoCantoData.length,
      })),
    };
  }
});

fs.writeFileSync(DATABASE_FILE, JSON.stringify(db, null, 2));
