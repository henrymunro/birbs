import { styled } from "./stitches.config";

export const Button = styled("button", {
  border: "2px solid $accentBorder",
  color: "$accentText",
  paddingLeft: "$4",
  paddingRight: "$4",
  paddingTop: "$3",
  paddingBottom: "$3",
  borderRadius: "$round",
  background: "white",
  cursor: "pointer",
  fontSize: "$2",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "$accentBorder",
    color: "white",
  },
});
