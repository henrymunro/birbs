import { Stack, Image, Box, h4 } from "../components";

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
      {birds.map(({ name, imgSrc, value }) => {
        const thisCorrect = value === correctBird;
        const incorrect = value === selectedBird && !thisCorrect;
        const somethingSelected = selectedBird;
        let background = "$accentBgSubtle";

        if (somethingSelected && thisCorrect) {
          background = "$successBase";
        }
        if (incorrect) {
          background = "$dangerBase";
        }

        return (
          <Box
            key={value}
            onClick={() => onSelectBird(value)}
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
  );
}
