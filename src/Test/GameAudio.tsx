import { useState } from "react";
import { TrackNextIcon } from "@radix-ui/react-icons";
import { Stack, IconButton } from "../components";

interface Props {
  srcs: string[];
}

export default function GameAudio({ srcs }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <Stack css={{ gap: "$2" }} center>
      <audio autoPlay controls src={srcs[index]} />
      <IconButton onClick={() => setIndex((idx) => (idx + 1) % srcs.length)}>
        <TrackNextIcon />
      </IconButton>
    </Stack>
  );
}
