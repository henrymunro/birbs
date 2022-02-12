import React from "react";
import { styled } from "@stitches/react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: "relative",
  overflow: "hidden",
  borderRadius: "99999px",
  width: 300,
  height: 25,
});

const StyledIndicator = styled(ProgressPrimitive.Indicator, {
  height: "100%",
  transition: "width 660ms cubic-bezier(0.65, 0, 0.35, 1)",
});

// Exports
export const Progress = StyledProgress;
export const ProgressIndicator = StyledIndicator;

interface Props {
  value: number;
  type?: "error";
}

export function ProgressBar({ value, type }: Props) {
  const [_progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timeoutId);
  }, [value]);

  let backgroundColor = "$accentBase";
  let foregroundColor = "$accentBgSubtle";

  if (type === "error") {
    backgroundColor = "$dangerBgSubtle";
    foregroundColor = "$dangerBase";
  }

  return (
    <Progress value={value} css={{ background: backgroundColor }}>
      <ProgressIndicator
        css={{ width: `${_progress}%`, backgroundColor: foregroundColor }}
      />
    </Progress>
  );
}
