import { red, orange, blackA } from "@radix-ui/colors";
import { Stack } from "../components";
interface Props {
  proportions: { name: string; value: number }[];
}

const colors = [
  ...Object.values(red).slice(4, 9).reverse(),
  ...Object.values(orange).slice(4, 9).reverse(),
];

export default function ProportionBar({ proportions }: Props) {
  const total = proportions.reduce((acc, { value }) => acc + value, 0);

  return (
    <Stack css={{ width: "100%", height: "25px" }}>
      {proportions.map(({ name, value }, i) => {
        const borderRadius = ["0", "0", "0", "0"];
        if (i === 0) {
          borderRadius[0] = "$round";
          borderRadius[3] = "$round";
        }
        if (i === proportions.length - 1) {
          borderRadius[1] = "$round";
          borderRadius[2] = "$round";
        }
        return (
          <Stack
            key={name}
            center
            css={{
              width: `${(value * 100) / total}%`,
              border: `1px solid ${blackA.blackA8}`,
              borderRadius: borderRadius.join(" "),
              background: colors[i] || colors[colors.length - 1],
              fontSize: "$1",
              fontWeight: "bold",
            }}
          >
            {name}
          </Stack>
        );
      })}
    </Stack>
  );
}
