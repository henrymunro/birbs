import { getDailyStatSummary } from "../database";
import { Box, Separator } from "../components";
import BirdSummary from "./BirdSummary";

interface Props {
  date: string;
}

export default function DaySummary({ date }: Props) {
  const summary = getDailyStatSummary(date);

  return (
    <Box css={{ background: "$accentBgSubtle", padding: "$3" }}>
      <Box as="h2" css={{ display: "flex", justifyContent: "space-between" }}>
        {summary.date}
        <b>
          {summary.correct}/{summary.total}
        </b>
      </Box>
      {summary.birdStats.map((stat) => (
        <div key={stat.bird}>
          <BirdSummary key={stat.bird} {...stat} />
          <Separator css={{ marginTop: "$2" }} />
        </div>
      ))}
    </Box>
  );
}
