import { Stack, Box } from "../components";

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
  return (
    <Stack spaced css={{ gap: "$2" }}>
      <h3>
        {bird}{" "}
        <b>
          {correct}/{correct + incorrect}
        </b>
      </h3>
      <Stack css={{ gap: "$2" }}>
        {mistakenFor.map((mistake) => {
          return (
            <Stack css={{ gap: "$2" }} verticalAlign>
              {mistake.bird} {(mistake.count * 100) / incorrect}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
