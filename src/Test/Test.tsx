import { useState, useEffect } from "react";
import { generateGame, Bird, logStat, getBirds } from "../database";
import { Stack, h4, Slider } from "../components";
import HabitatSelect from "../common/HabitatSelect";
import BirdTestTiles from "./BirdTestTiles";
import HardModeAutocomplete from "./HardModeAutocomplete";

export default function Guessing({ hardMode }: { hardMode?: boolean }) {
  const [game, setGame] = useState(generateGame());
  const [selected, setSelected] = useState<string | null>(null);
  const [habitat, setHabitat] = useState<string | null>(null);
  const [counter, setCounter] = useState({ correct: 0, total: 0 });
  const [numberOfBirds, setNumberOfBirds] = useState(8);

  useEffect(() => {
    setGame(generateGame({ habitat, numberOfGuesses: numberOfBirds }));
  }, [numberOfBirds, habitat]);

  function onSelectBird(val?: Bird | null) {
    if (!val || selected) {
      return;
    }
    setSelected(val);
    logStat({ actual: game.correct, picked: val });

    if (val === game.correct) {
      setCounter((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      setCounter((s) => ({ correct: s.correct, total: s.total + 1 }));
    }

    setTimeout(() => {
      setSelected(null);
      setGame(generateGame({ habitat, numberOfGuesses: numberOfBirds }));
    }, 2000);
  }

  return (
    <>
      <Stack wrap center css={{ gap: "$3", marginBottom: "$4" }}>
        <Stack center css={{ gap: "$4" }}>
          <audio autoPlay controls src={game.audioSource} />
          <h2>
            {counter.correct}/{counter.total}
          </h2>
        </Stack>
        {!hardMode && (
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
        )}
        <HabitatSelect onChange={setHabitat} />
      </Stack>
      {hardMode ? (
        <HardModeAutocomplete
          birds={getBirds({ habitat })}
          onBirdSelect={onSelectBird}
          correctBird={game.correct}
          selectedBird={selected}
        />
      ) : (
        <BirdTestTiles
          onSelectBird={onSelectBird}
          correctBird={game.correct}
          selectedBird={selected}
          birds={game.values}
        />
      )}
    </>
  );
}
