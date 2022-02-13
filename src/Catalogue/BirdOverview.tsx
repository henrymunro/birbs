import { Bird, getBird } from "../database";
import { Image, Box, Stack } from "../components";
import BirdAudio from "./BirdAudio";
interface Props {
  bird: Bird;
}

export default function BirdOverview({ bird }: Props) {
  const { name, imgsSrc } = getBird(bird);

  return (
    <div>
      <h2>{name}</h2>
      <Stack css={{ gap: "$4" }}>
        <Box
          css={{ width: "50%", maxWidth: "500px", "@bp2": { width: "100%" } }}
        >
          <Image alt={name} src={imgsSrc[0]} />
        </Box>
        <Box css={{ width: "50%", "@bp2": { width: "100%" } }}>
          <BirdAudio bird={bird} />
        </Box>
      </Stack>
    </div>
  );
}
