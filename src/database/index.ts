import audioDatabase from "./audio-database.json";
import { getRandomElement, getRandomElements } from "./utils";

export type Bird = keyof typeof audioDatabase;
export const birds = Object.keys(audioDatabase) as any as Bird[];

function getAudioFilepath({ filename }: { filename: string }) {
  return `/audio/${filename}`;
}

export function generateGame(numberOfGuesses: number = 10) {
  const birdNamesToUse = getRandomElements(birds, numberOfGuesses);

  const correctBirdName = getRandomElement(birdNamesToUse);

  const audio = getRandomElement(audioDatabase[correctBirdName]);

  return {
    correct: correctBirdName,
    values: birdNamesToUse,
    audioSource: getAudioFilepath(audio),
  };
}
