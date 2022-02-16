const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");

const AUDIO_DATABASE_FILE = path.join("./data/audio.json");
const NUMBER_OF_RECORDINGS_PER_BIRD = 20;

const birds = JSON.parse(fs.readFileSync("./data/species.json"));

// https://xeno-canto.org/explore/api
async function queryBird(birdName, queryPage = 1) {
  const queryString = birdName.replace(/\s/g, "+");
  const query = `https://www.xeno-canto.org/api/2/recordings?query=${queryString}+q:A&page=${queryPage}`;
  const response = await fetch(query);
  const body = await response.json();

  const { numRecordings, numSpecies, page, numPages, recordings } = body;

  if (numSpecies < "1") {
    throw new Error("Counldn't find any species for:  " + query);
  }
  if (numSpecies !== "1") {
    throw new Error("Got more than one species for:  " + query);
  }

  console.log(
    `Search: ${birdName} (page ${page}/${numPages}) ${recordings.length}/${numRecordings} recordings`
  );

  return {
    nextPage: page < numPages ? page + 1 : null,
    recordings,
  };
}

function getDatabase() {
  let currentContent = {};
  if (fs.existsSync(AUDIO_DATABASE_FILE)) {
    currentContent = JSON.parse(fs.readFileSync(AUDIO_DATABASE_FILE));
  }
  return currentContent;
}

function mergeDatabase(birdName, downloads) {
  const currentContent = getDatabase();

  if (!currentContent[birdName]) {
    currentContent[birdName] = [];
  }

  downloads.forEach((d) => {
    if (!currentContent[birdName].find((x) => x.id === d.id)) {
      currentContent[birdName].push(d);
    }
  });

  fs.writeFileSync(
    AUDIO_DATABASE_FILE,
    JSON.stringify(currentContent, null, 2)
  );
}

async function main() {
  const failures = [];
  const db = getDatabase();
  for (const bird of birds) {
    try {
      if (db[bird]?.length === NUMBER_OF_RECORDINGS_PER_BIRD) {
        console.log(`Got enough recordings for ${bird}, skipping.`);
        continue;
      }
      const { recordings } = await queryBird(bird);

      if (recordings.length < NUMBER_OF_RECORDINGS_PER_BIRD) {
        console.log(
          `Number of recordings for ${bird} is less than ${NUMBER_OF_RECORDINGS_PER_BIRD}`
        );
      }

      const downloads = recordings.slice(0, NUMBER_OF_RECORDINGS_PER_BIRD);

      mergeDatabase(bird, downloads);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // rate limit to save their api
    } catch (err) {
      console.log("Error:", err.message);
      failures.push(err);
    }
  }

  console.log("Done", { failures: failures.map((e) => e.message).sort() });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
