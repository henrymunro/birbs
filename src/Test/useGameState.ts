import { useState } from "react";
import { Bird, logStat } from "../database";

export default function useGameState({
  onNextRound,
  correct,
}: {
  onNextRound: () => void;
  correct: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [counter, setCounter] = useState({ correct: 0, total: 0 });

  function onSelectBird(val?: Bird | null) {
    if (!val || selected) {
      return;
    }
    setSelected(val);
    logStat({ actual: correct, picked: val });

    if (val === correct) {
      setCounter((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      setCounter((s) => ({ correct: s.correct, total: s.total + 1 }));
    }

    setTimeout(() => {
      setSelected(null);
      onNextRound();
    }, 2000);
  }

  return {
    onSelectBird,
    counter,
    selected,
  };
}
