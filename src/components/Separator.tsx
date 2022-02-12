import { styled } from "@stitches/react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const StyledSeparator = styled(SeparatorPrimitive.Root, {
  backgroundColor: "$accentLine",
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },
});

// Exports
export const Separator = StyledSeparator;
