const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const request = require("request");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIRECTORY = path.join(__dirname + "../public/audio");
const AUDIO_DATABASE_FILE = path.join(
  __dirname + "../src/database/audio-database.json"
);
const NUMBER_OF_RECORDINGS_PER_BIRD = 20;

const birds = JSON.parse(fs.readFileSync("./species.json"));

// https://xeno-canto.org/explore/api
async function queryBird(birdName, queryPage = 1) {
  const queryString = birdName.replace(/\s/g, "+");
  const query = `https://www.xeno-canto.org/api/2/recordings?query=${queryString}+q:A&page=${queryPage}`;
  const response = await fetch(query);
  const body = await response.json();

  const { numRecordings, numSpecies, page, numPages, recordings } = body;

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

function download(uri, filename) {
  return new Promise((resolve) => {
    request.head(uri, function (err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", () => resolve());
    });
  });
}

function getDatabase() {
  let currentContent = {};
  if (fs.existsSync(AUDIO_DATABASE_FILE)) {
    currentContent = JSON.parse(fs.readFileSync(AUDIO_DATABASE_FILE));
  }
  return currentContent;
}

let cachedDB;
function fileExistsInDatabase(bird, filename) {
  if (!cachedDB) {
    cachedDB = getDatabase();
  }
  const birdName = bird.toLowerCase().replace(/\s/g, "-");

  return !!(cachedDB[birdName] || []).find((x) => x.filename === filename);
}

function mergeDatabase(bird, downloads) {
  const birdName = bird.toLowerCase().replace(/\s/g, "-");

  const currentContent = getDatabase();

  if (!currentContent[birdName]) {
    currentContent[birdName] = [];
  }

  downloads.forEach((d) => {
    if (!currentContent[birdName].find((x) => x.filename === d.filename)) {
      currentContent[birdName].push(d);
    }
  });

  fs.writeFileSync(
    AUDIO_DATABASE_FILE,
    JSON.stringify(currentContent, null, 2)
  );
}

async function downloadRecordings(bird, recordings, number) {
  const birdName = bird.toLowerCase().replace(/\s/g, "-");
  const dir = `${OUTPUT_DIRECTORY}/${birdName}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const recordingsToDownload = recordings.slice(0, number);
  console.log(
    `Download: downloading ${recordingsToDownload.length} recordings`
  );

  const downloads = [];
  let i = 0;
  for (const recording of recordingsToDownload) {
    const ourFilename = `${birdName}/${recording.id}.mp3`;
    try {
      i++;
      if (fileExistsInDatabase(bird, ourFilename)) {
        console.log(
          `Download skipping: ${i}/${recordingsToDownload.length} :: ${ourFilename} already exists in our DB`
        );
        continue;
      } else {
        console.log(
          `Download processing: ${i}/${recordingsToDownload.length} :: ${ourFilename}`
        );
      }

      await download(recording.file, `${OUTPUT_DIRECTORY}/${ourFilename}`);

      downloads.push({
        filename: ourFilename,
        xenoCantoData: recording,
      });
    } catch (err) {
      console.error(`ERROR: unable to download file ${ourFilename} ${err}`);
    }
  }

  return downloads;
}

async function main() {
  const failures = [];
  for (const bird of birds) {
    try {
      const { recordings } = await queryBird(bird);

      if (recordings.length < NUMBER_OF_RECORDINGS_PER_BIRD) {
        throw new Error(
          `Number of recordings for ${bird} is less than ${NUMBER_OF_RECORDINGS_PER_BIRD} in this page: implement paging`
        );
      }

      const downloads = await downloadRecordings(
        bird,
        recordings,
        NUMBER_OF_RECORDINGS_PER_BIRD
      );

      mergeDatabase(bird, downloads);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // rate limit to save their api
    } catch (err) {
      failures.push(err);
    }
  }

  console.log("Done", { failures });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
