import { Box, Stack } from "../components";

interface Props {
  value: number;
}

export default function PopulationNumber({ value }: Props) {
  const step1 = true;
  const step2 = value >= 10000;
  const step3 = value >= 100000;
  const step4 = value >= 1000000;
  const step5 = value > 10000000;

  let background = "$dangerBase";
  if (step2) background = "$dangerBgSubtle";
  if (step3) background = "$warningBgSubtle";
  if (step4) background = "$successBgSubtle";
  if (step5) background = "$successBase";

  return (
    <Stack css={{ width: "100%", gap: "$2", justifyContent: "space-between" }}>
      <Stack
        css={{
          height: "$3",
          borderRadius: "$round",
          overflow: "hidden",
          border: "1px solid $accentLine",
          flexGrow: 1,
        }}
      >
        <Box
          css={{
            flexGrow: 1,
            borderRight: "1px solid $accentLine",
            background: step1 ? background : undefined,
          }}
        />
        <Box
          css={{
            flexGrow: 1,
            borderRight: "1px solid $accentLine",
            background: step2 ? background : undefined,
          }}
        />
        <Box
          css={{
            flexGrow: 1,
            borderRight: "1px solid $accentLine",
            background: step3 ? background : undefined,
          }}
        />
        <Box
          css={{
            flexGrow: 1,
            borderRight: "1px solid $accentLine",
            background: step4 ? background : undefined,
          }}
        />
        <Box
          css={{ flexGrow: 1, background: step5 ? background : undefined }}
        />
      </Stack>
      <Box css={{ width: "90px", textAlign: "end" }}>
        {value.toLocaleString()}
      </Box>
    </Stack>
  );
}
