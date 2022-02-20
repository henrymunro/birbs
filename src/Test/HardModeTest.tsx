import { useState, useEffect } from "react";
import { generateGame, getBirds } from "../database";
import { Stack } from "../components";
import HabitatSelect from "../common/HabitatSelect";
import HardModeAutocomplete from "./HardModeAutocomplete";
import useGameState from "./useGameState";

export default function HardModeTest() {
  const [game, setGame] = useState(generateGame());
  const [habitat, setHabitat] = useState<string | null>(null);

  const { onSelectBird, counter, selected } = useGameState({
    correct: game.correct,
    onNextRound: () => setGame(generateGame({ habitat })),
  });

  useEffect(() => {
    setGame(generateGame({ habitat }));
  }, [habitat]);

  return (
    <>
      <Stack wrap center css={{ gap: "$3", marginBottom: "$4" }}>
        <Stack center css={{ gap: "$4" }}>
          <audio autoPlay controls src={game.audioSource} />
          <h2>
            {counter.correct}/{counter.total}
          </h2>
        </Stack>
        <HabitatSelect onChange={setHabitat} />
      </Stack>
      <HardModeAutocomplete
        birds={getBirds({ habitat })}
        onBirdSelect={onSelectBird}
        correctBird={game.correct}
        selectedBird={selected}
      />
    </>
  );
}
