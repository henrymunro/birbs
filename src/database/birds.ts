import database from "./database.json";
import { getRandomElement, getRandomElements } from "./utils";

export type Bird = keyof typeof database;
export const birds = Object.keys(database) as any as Bird[];

function audioFilepath({ path }: { path: string }) {
  return `/audio/${path}`;
}

function imageFilepath({ path }: { path: string }) {
  return `/images/${path}`;
}

export function generateGame(numberOfGuesses: number = 8) {
  const birdNamesToUse = getRandomElements(birds, numberOfGuesses);

  const correctBirdName = getRandomElement(birdNamesToUse);

  const audio = getRandomElement(database[correctBirdName].audio);

  return {
    correct: correctBirdName,
    values: birdNamesToUse.map((b) => ({
      value: b,
      name: database[b].name,
      imgSrc: imageFilepath(getRandomElement(database[b].images)),
    })),
    audioSource: audioFilepath(audio),
  };
}
