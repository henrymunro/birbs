import React, { useState, useRef } from "react";
import { generateGame, Bird, logStat } from "../database";
import { Stack, Image, Box } from "../components";

export default function Guessing() {
  const [game, setGame] = useState(generateGame());
  const [selected, setSelected] = useState<string | void>();
  const [counter, setCounter] = useState({ correct: 0, total: 0 });

  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  function onClick(val: Bird) {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setSelected(val);
    logStat({ actual: game.correct, picked: val });

    if (val === game.correct) {
      setCounter((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      setCounter((s) => ({ correct: s.correct, total: s.total + 1 }));
    }

    const timeoutId = setTimeout(() => {
      setSelected();
      setGame(generateGame());
    }, 2000);
    timeoutRef.current = timeoutId;
  }

  return (
    <>
      <Stack center css={{ gap: "$5", marginBottom: "$4" }}>
        <audio autoPlay controls src={game.audioSource} />
        <h2>
          {counter.correct}/{counter.total}
        </h2>
      </Stack>

      <Stack wrap css={{ gap: "$2" }}>
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
              onClick={() => onClick(value)}
              css={{
                background,
                padding: "$2",
                borderRadius: "$3",
                cursor: "pointer",
              }}
            >
              <Image src={imgSrc} alt={name} />
              <h4>{name}</h4>
            </Box>
          );
        })}
      </Stack>
    </>
  );
}
