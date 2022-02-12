import { useState, useEffect } from "react";
import { generateGame, Bird, logStat } from "../database";
import { Stack, Image, Box, h4, Slider } from "../components";

export default function Guessing() {
  const [game, setGame] = useState(generateGame());
  const [selected, setSelected] = useState<string | void>();
  const [counter, setCounter] = useState({ correct: 0, total: 0 });
  const [numberOfBirds, setNumberOfBirds] = useState(8);

  useEffect(() => {
    setGame(generateGame(numberOfBirds));
  }, [numberOfBirds]);

  function onClick(val: Bird) {
    if (selected) {
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
      setSelected();
      setGame(generateGame());
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
      </Stack>

      <Stack wrap center css={{ gap: "$2", "@bp1": { gap: "$1" } }}>
        {game.values.map(({ name, imgSrc, value }) => {
          const correct = value === game.correct;
          const incorrect = value === selected && !correct;
          const somethingSelected = selected;
          let background = "$accentBgSubtle";

          if (somethingSelected && correct) {
            background = "$successBase";
          }
          if (incorrect) {
            background = "$dangerBase";
          }

          return (
            <Box
              key={value}
              onClick={() => onClick(value)}
              css={{
                background,
                padding: "$2",
                borderRadius: "$3",
                cursor: "pointer",
                width: "23%",
                "@bp2": { width: "30%" },
                "@bp1": { width: "43%" },
              }}
            >
              <Image src={imgSrc} alt={name} />
              <h4 className={h4()}>{name}</h4>
            </Box>
          );
        })}
      </Stack>
    </>
  );
}
