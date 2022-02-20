import { Stack } from "../components";
import BirdTile from "./BirdTile";

interface Props {
  onSelectBird: (val: string) => void;
  correctBird: string;
  selectedBird: string | null;
  birds: { name: string; imgSrc: string; value: string }[];
}

export default function BirdTestTiles({
  onSelectBird,
  correctBird,
  selectedBird,
  birds,
}: Props) {
  return (
    <Stack wrap center css={{ gap: "$2", "@bp1": { gap: "$1" } }}>
      {birds.map((bird) => (
        <BirdTile
          {...bird}
          onSelectBird={onSelectBird}
          correctBird={correctBird}
          selectedBird={selectedBird}
        />
      ))}
    </Stack>
  );
}
