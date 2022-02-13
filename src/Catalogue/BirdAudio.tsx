import { useState, useRef, useEffect } from "react";
import { Bird, getBird } from "../database";
import { ScrollArea, Separator, Box, Stack, Audio } from "../components";

interface Props {
  bird: Bird;
}

let playing: string | null = null;

function useGlobalPause(src: string, ref: React.RefObject<HTMLAudioElement>) {
  useEffect(() => {
    ref.current?.addEventListener("play", () => {
      playing = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing === src) return;
      ref.current?.pause();
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return playing;
}

export default function BirdAudio({ bird }: Props) {
  const firstRender = useRef(true);
  const ref = useRef<HTMLAudioElement | null>(null);
  const { audiosSrc } = getBird(bird);
  const [srcIndex, setSrcIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useGlobalPause(audiosSrc[srcIndex].path, ref);

  useEffect(() => {
    if (!firstRender.current) {
      ref.current?.play();
    }
    firstRender.current = false;
  }, [srcIndex]);

  useEffect(() => {
    ref.current?.addEventListener("ended", () => {
      setSrcIndex((idx) => (idx + 1) % audiosSrc.length);
    });
    ref.current?.addEventListener("play", () => {
      setPlaying(true);
    });
    ref.current?.addEventListener("pause", () => {
      setPlaying(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction="column" css={{ gap: "$3" }}>
      <Audio ref={ref} controls src={audiosSrc[srcIndex].path} />
      <ScrollArea highlight={playing}>
        <Stack direction="column">
          {audiosSrc.map((audio, index) => {
            let background;
            if (index === srcIndex) {
              background = "rgba(0,0,0,0.1)";
            }
            if (index === srcIndex && playing) {
              background = "$successBgSubtle";
            }
            return (
              <Stack
                key={audio.path}
                onClick={() => setSrcIndex(index)}
                verticalAlign
                css={{
                  gap: "$2",
                  cursor: "pointer",
                  borderBottom: "1px solid $accentLine",
                  height: "35px",
                  paddingLeft: "$2",
                  paddingRight: "$2",
                  background,
                  fontSize: "$2",
                }}
              >
                <Box css={{ minWidth: "40px" }}>{audio.length}</Box>
                <Separator orientation="vertical" />
                {audio.type}
              </Stack>
            );
          })}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
