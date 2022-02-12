import React from "react";
import { styled } from "@stitches/react";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { IconButton } from "./Button";

const StyledCollapsible = styled(CollapsiblePrimitive.Root, {
  width: 300,
});

// Exports
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
const CollapsibleContent = CollapsiblePrimitive.Content;

const Flex = styled("div", { display: "flex" });

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function Collapsible({ header, children }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <StyledCollapsible open={open} onOpenChange={setOpen}>
      <Flex css={{ alignItems: "center", justifyContent: "space-between" }}>
        {header}
        <CollapsibleTrigger asChild>
          <IconButton>{open ? <Cross2Icon /> : <RowSpacingIcon />}</IconButton>
        </CollapsibleTrigger>
      </Flex>
      <CollapsibleContent>{children}</CollapsibleContent>
    </StyledCollapsible>
  );
}
