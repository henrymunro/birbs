import { Stack } from "../components";
import BirdAutocomplete from "../common/BirdAutocomplete";

interface Props {
  birds?: string[];
  onBirdSelect: (bird: string | null) => void;
  correctBird: string;
  selectedBird: string | null;
}

export default function HardModeAutocomplete({
  birds,
  onBirdSelect,
  correctBird,
  selectedBird,
}: Props) {
  const incorrect = selectedBird && selectedBird !== correctBird;
  const correct = selectedBird && selectedBird === correctBird;

  let background;
  if (correct) {
    background = "$successBase";
  }
  if (incorrect) {
    background = "$dangerBase";
  }

  return (
    <Stack
      center
      direction="column"
      css={{ background, gap: "$2", padding: "$3", borderRadius: "$3" }}
    >
      <BirdAutocomplete
        value={selectedBird}
        birds={birds}
        onChange={onBirdSelect}
      />
      {incorrect ? correctBird : ""}
    </Stack>
  );
}
