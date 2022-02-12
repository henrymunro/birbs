import React from "react";
import { styled } from "@stitches/react";
import { blackA } from "@radix-ui/colors";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

// Exports
const AspectRatio = AspectRatioPrimitive;

// Your app...
const Box = styled("div", {});
const Img = styled("img", {
  objectFit: "cover",
  width: "100%",
  height: "100%",
});

interface Props {
  src: string;
  alt: string;
}

export function Image({ src, alt }: Props) {
  return (
    <Box
      css={{
        width: 300,
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
      }}
    >
      <AspectRatio.Root ratio={16 / 9}>
        <Img src={src} alt={alt} />
      </AspectRatio.Root>
    </Box>
  );
}
