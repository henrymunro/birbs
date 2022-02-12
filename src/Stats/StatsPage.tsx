import { getDaysWithStats, resetStats } from "../database";
import { Button } from "../components";

import DaySummary from "./DaySummary";

export default function StatsPage() {
  const days = getDaysWithStats();

  return (
    <>
      <Button onClick={resetStats}>Reset</Button>
      {days.map((date) => (
        <DaySummary key={date} date={date} />
      ))}
    </>
  );
}
