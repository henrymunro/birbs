import { useState, useEffect } from "react";
import { generateGame } from "../database";
import { Stack, h4, Slider } from "../components";
import HabitatSelect from "../common/HabitatSelect";
import BirdTestTiles from "./BirdTestTiles";
import useGameState from "./useGameState";

export default function MultiTileTest() {
  const [game, setGame] = useState(generateGame());
  const [habitat, setHabitat] = useState<string | null>(null);
  const [numberOfBirds, setNumberOfBirds] = useState(8);

  const { onSelectBird, counter, selected } = useGameState({
    correct: game.correct,
    onNextRound: () =>
      setGame(generateGame({ habitat, numberOfGuesses: numberOfBirds })),
  });

  useEffect(() => {
    setGame(generateGame({ habitat, numberOfGuesses: numberOfBirds }));
  }, [numberOfBirds, habitat]);

  return (
    <>
      <Stack wrap center css={{ gap: "$3", marginBottom: "$4" }}>
        <Stack center css={{ gap: "$4" }}>
          <audio autoPlay controls src={game.audioSource} />
          <h2>
            {counter.correct}/{counter.total}
          </h2>
        </Stack>
        <Stack verticalAlign css={{ gap: "$2" }}>
          <h4 className={h4()}>Difficulty:</h4>
          <Slider
            min={2}
            max={10}
            step={1}
            value={numberOfBirds}
            onChange={setNumberOfBirds}
          />
        </Stack>
        <HabitatSelect onChange={setHabitat} />
      </Stack>
      <BirdTestTiles
        onSelectBird={onSelectBird}
        correctBird={game.correct}
        selectedBird={selected}
        birds={game.values}
      />
    </>
  );
}
