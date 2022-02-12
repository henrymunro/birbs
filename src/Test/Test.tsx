import React, { useState } from "react";
import { generateGame, Bird } from "../database";
import { Stack } from "../components";

export default function Guessing() {
  const [game, setGame] = useState(generateGame());
  const [correct, setCorrect] = useState<boolean | void>();
  const [counter, setCounter] = useState({ correct: 0, total: 0 });

  function onClick(val: Bird) {
    if (val === game.correct) {
      setCorrect(true);
      setCounter((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      setCorrect(false);
      setCounter((s) => ({ correct: s.correct, total: s.total + 1 }));
    }

    setTimeout(() => {
      setCorrect();
      setGame(generateGame());
    }, 2000);
  }

  return (
    <>
      <h2>
        {counter.correct}/{counter.total}
      </h2>
      <div style={{ height: "80px" }}>
        {correct === true && <h2 style={{ color: "green" }}>CORRECT</h2>}
        {correct === false && (
          <h2 style={{ color: "red" }}>WRONG - {game.correct}</h2>
        )}
      </div>
      <audio autoPlay controls src={game.audioSource} />

      <Stack>
        {game.values.map((name) => (
          <div onClick={() => onClick(name)}>
            {/* <img style={{ height: "180px", width: "260px" }} src={imgSrc} /> */}
            <h4>{name}</h4>
          </div>
        ))}
      </Stack>
    </>
  );
}
