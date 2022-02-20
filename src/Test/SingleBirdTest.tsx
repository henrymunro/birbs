import { useState, useEffect } from "react";
import { generateSingleBirdGame, birds } from "../database";
import { Stack } from "../components";
import BirdSelect from "../common/BirdSelect";
import BirdTestTiles from "./BirdTestTiles";
import GameAudio from "./GameAudio";
import useGameState from "./useGameState";

export default function SingleBirdTest() {
  const [bird, setBird] = useState(birds[0]);
  const [game, setGame] = useState(
    generateSingleBirdGame({ mustIncludeBird: bird })
  );

  const { onSelectBird, counter, selected } = useGameState({
    correct: game.correct,
    onNextRound: () =>
      setGame(generateSingleBirdGame({ mustIncludeBird: bird })),
  });

  useEffect(() => {
    setGame(generateSingleBirdGame({ mustIncludeBird: bird }));
  }, [bird]);

  return (
    <>
      <Stack wrap center css={{ gap: "$3", marginBottom: "$4" }}>
        <Stack center css={{ gap: "$4" }}>
          <GameAudio srcs={game.audioSource} />
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
