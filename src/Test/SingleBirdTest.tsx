import { useState, useEffect } from "react";
import { generateGame, birds } from "../database";
import { Stack } from "../components";
import BirdSelect from "../common/BirdSelect";
import BirdTestTiles from "./BirdTestTiles";
import useGameState from "./useGameState";

export default function SingleBirdTest() {
  const [bird, setBird] = useState(birds[0]);
  const [game, setGame] = useState(
    generateGame({ mustIncludeBird: bird, numberOfGuesses: 2 })
  );

  const { onSelectBird, counter, selected } = useGameState({
    correct: game.correct,
    onNextRound: () =>
      setGame(generateGame({ mustIncludeBird: bird, numberOfGuesses: 2 })),
  });

  useEffect(() => {
    setGame(generateGame({ mustIncludeBird: bird, numberOfGuesses: 2 }));
  }, [bird]);

  return (
    <>
      <Stack wrap center css={{ gap: "$3", marginBottom: "$4" }}>
        <Stack center css={{ gap: "$4" }}>
          <audio autoPlay controls src={game.audioSource} />
          <h2>
            {counter.correct}/{counter.total}
          </h2>
        </Stack>
      </Stack>
      <BirdSelect value={bird} onChange={setBird} />
      <BirdTestTiles
        onSelectBird={onSelectBird}
        correctBird={game.correct}
        selectedBird={selected}
        birds={game.values}
      />
    </>
  );
}
