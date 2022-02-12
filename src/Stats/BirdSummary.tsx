import { useState } from "react";
import { Stack, ProgressBar } from "../components";

interface Props {
  bird: string;
  correct: number;
  incorrect: number;
  mistakenFor: { bird: string; count: number }[];
}

export default function BirdSummary({
  bird,
  correct,
  incorrect,
  mistakenFor,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ cursor: "pointer" }} onClick={() => setOpen((s) => !s)}>
      <h3>
        {bird}{" "}
        <b>
          {correct}/{correct + incorrect}
        </b>
      </h3>
      {open && (
        <Stack direction="column" css={{ gap: "$2" }}>
          {mistakenFor.map((mistake) => {
            return (
              <Stack css={{ gap: "$2" }} verticalAlign>
                {mistake.bird}
                <ProgressBar
                  value={(mistake.count * 100) / incorrect}
                  type="error"
                />
              </Stack>
            );
          })}
        </Stack>
      )}
    </div>
  );
}
