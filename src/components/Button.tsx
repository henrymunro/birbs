import { violet, blackA } from "@radix-ui/colors";
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

export const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&[data-state="closed"]': { backgroundColor: "white" },
  '&[data-state="open"]': { backgroundColor: violet.violet3 },
  "&:hover": { backgroundColor: violet.violet3 },
  "&:focus": { boxShadow: `0 0 0 2px black` },
});
