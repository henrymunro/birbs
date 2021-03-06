import importedDb from "./database.json";
import { getRandomElement, getRandomElements, shuffle } from "./utils";

interface Entry {
  name: string;
  statusInBritain: string;
  populationNumber: number;
  images: string[];
  euroBirdLink?: string;
  foundIn: string;
  habitats?: Record<string, number>;
  audio?: { path: string; type: string; length: string }[];
}

const database: Record<string, Entry> = importedDb;

export type Bird = keyof typeof database;
export const birds = Object.keys(database)
  .filter((b) => {
    return database[b].audio?.length! > 0 && database[b].images?.length;
  })
  .sort((a, b) => a.localeCompare(b)) as any as Bird[];

export const habitats = birds.reduce((acc, bird) => {
  const birdHabitats = database[bird].habitats;
  if (!birdHabitats) return acc;

  Object.keys(birdHabitats).forEach((h) => {
    if (!acc.includes(h)) {
      acc.push(h);
    }
  });

  return acc;
}, [] as string[]);

function audioFilepath(path: string) {
  return path.includes("http") ? path : `/audio/${path}`;
}

export function getBird(bird: Bird) {
  return {
    value: bird,
    name: database[bird].name,
    statusInBritain: database[bird].statusInBritain,
    populationNumber: database[bird].populationNumber,
    imgsSrc: database[bird].images,
    audiosSrc:
      database[bird].audio?.map((a) => ({
        ...a,
        path: audioFilepath(a.path),
      })) || [],
  };
}

export function getHabitatForBird(bird: Bird) {
  return Object.entries(database[bird].habitats || {}).map(
    ([habitat, proportion]) => ({ habitat, proportion })
  );
}

export function getBirds({ habitat }: { habitat?: string | null } = {}) {
  return birds.filter((b) => {
    if (!habitat) return true;

    const birdHabitats = database[b].habitats;

    if (!birdHabitats) return false;
    const topHabitat = Object.values(birdHabitats).reduce(
      (a, b) => (a > b ? a : b),
      0
    );

    return birdHabitats[habitat] ?? 0 > topHabitat / 3;
  });
}

export function generateGame({
  numberOfGuesses = 8,
  habitat,
}: {
  habitat?: string | null;
  numberOfGuesses?: number;
} = {}) {
  const gameBirds = getBirds({ habitat });

  const birdNamesToUse = getRandomElements(gameBirds, numberOfGuesses);

  const correctBirdName = getRandomElement(birdNamesToUse);

  const audio = shuffle(database[correctBirdName].audio!);

  return {
    correct: correctBirdName,
    values: birdNamesToUse.map((b) => ({
      value: b,
      name: database[b].name,
      imgSrc: getRandomElement(database[b].images),
    })),
    audioSource: audio.map(({ path }) => audioFilepath(path)),
  };
}

export function generateSingleBirdGame({
  mustIncludeBird,
}: {
  mustIncludeBird: string;
}) {
  const habitat = getRandomElement(
    getHabitatForBird(mustIncludeBird) || []
  )?.habitat;
  const gameBirds = getBirds({ habitat });

  const birdNamesToUse = shuffle([
    mustIncludeBird,
    getRandomElement(gameBirds.filter((b) => b !== mustIncludeBird)),
  ]);

  const correctBirdName = getRandomElement(birdNamesToUse);

  const audio = shuffle(database[correctBirdName].audio!);

  return {
    correct: correctBirdName,
    values: birdNamesToUse.map((b) => ({
      value: b,
      name: database[b].name,
      imgSrc: getRandomElement(database[b].images),
    })),
    audioSource: audio.map(({ path }) => audioFilepath(path)),
  };
}
