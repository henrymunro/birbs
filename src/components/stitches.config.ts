// stitches.config.ts
import { createStitches } from "@stitches/react";
import { gray, blue, yellow, red, green } from "@radix-ui/colors";
import { stackGap } from "./gap-util";

export const { styled } = createStitches({
  theme: {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...yellow,

      accentBase: "$blue1",
      accentBgSubtle: "$blue2",
      accentBg: "$blue3",
      accentBgHover: "$blue4",
      accentBgActive: "$blue5",
      accentLine: "$blue6",
      accentBorder: "$blue7",
      accentBorderHover: "$blue8",
      accentSolid: "$blue9",
      accentSolidHover: "$blue10",
      accentText: "$blue11",
      accentTextContrast: "$blue12",

      successBase: "$green1",
      successBgSubtle: "$green2",
      // repeat for all steps

      warningBase: "$yellow1",
      warningBgSubtle: "$yellow2",
      // repeat for all steps

      dangerBase: "$red1",
      dangerBgSubtle: "$red2",
      // repeat for all steps
    },
    fonts: {
      sans: "Inter, sans-serif",
    },
    fontSizes: {
      1: "12px",
      2: "14px",
      3: "16px",
      4: "20px",
      5: "24px",
      6: "32px",
    },
    space: {
      1: "4px",
      2: "8px",
      3: "16px",
      4: "32px",
      5: "64px",
      6: "128px",
    },
    sizes: {
      1: "4px",
      2: "8px",
      3: "16px",
      4: "32px",
      5: "64px",
      6: "128px",
    },
    radii: {
      1: "2px",
      2: "4px",
      3: "8px",
      round: "9999px",
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    borderWidths: {},
    borderStyles: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  utils: {
    stackGap,
  },
});

export const Box = styled("div");
