import { Stack, Box } from "../components";
import ProportionBar from "./ProportionBar";

interface Props {
  bird: string;
  correct: number;
  incorrect: number;
  mistakenFor: { bird: string; count?: number }[];
}

export default function BirdSummary({
  bird,
  correct,
  incorrect,
  mistakenFor,
}: Props) {
  return (
    <Stack spaced wrap verticalAlign>
      <Box css={{ width: "24%", "@bp2": { width: "100%" } }}>
        <h3>
          {bird}{" "}
          <b>
            {correct}/{correct + incorrect}
          </b>
        </h3>
      </Box>
      <Box css={{ width: "75%", "@bp2": { width: "100%" } }}>
        <ProportionBar
          proportions={mistakenFor.map(({ bird, count = 0 }) => ({
            name: bird,
            value: count,
          }))}
        />
      </Box>
    </Stack>
  );
}
