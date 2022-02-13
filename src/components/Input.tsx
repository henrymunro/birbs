import { styled } from "./stitches.config";

export const Input = styled("input", {
  height: "$4",
  borderRadius: "$2",
  borderColor: "$accentBorder",
  "&:focus": {
    borderColor: "$accentBorderHover",
  },
});
