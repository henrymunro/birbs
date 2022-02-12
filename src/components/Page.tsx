import { styled } from "./stitches.config";

export const Page = styled("div", {
  paddingLeft: "$5",
  paddingRight: "$5",
  paddingBottom: "$5",
  paddingTop: "$3",
  "@bp2": {
    paddingLeft: "$4",
    paddingRight: "$4",
    paddingBottom: "$4",
    paddingTop: "$2",
  },
  "@bp1": {
    paddingLeft: "$3",
    paddingRight: "$3",
    paddingBottom: "$3",
    paddingTop: "$2",
  },
});
