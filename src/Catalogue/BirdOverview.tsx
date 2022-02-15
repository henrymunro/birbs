import { Bird, getBird } from "../database";
import { Image, Box, Stack } from "../components";
import BirdAudio from "./BirdAudio";
import PopulationNumber from "../common/PopulationNumber";

interface Props {
  bird: Bird;
}

export default function BirdOverview({ bird }: Props) {
  const { name, imgsSrc, populationNumber, statusInBritain } = getBird(bird);

  return (
    <div>
      <h2>{name}</h2>
      <Stack wrap css={{ gap: "$4", justifyContent: "space-between" }}>
        <Box
          css={{ width: "45%", maxWidth: "500px", "@bp2": { width: "100%" } }}
        >
          <Stack direction="column" css={{ gap: "$2" }}>
            <Image alt={name} src={imgsSrc[0]} />
            <PopulationNumber value={populationNumber} />
            {statusInBritain}
          </Stack>
        </Box>
        <Box css={{ width: "50%", "@bp2": { width: "100%" } }}>
          <BirdAudio bird={bird} />
        </Box>
      </Stack>
    </div>
  );
}
