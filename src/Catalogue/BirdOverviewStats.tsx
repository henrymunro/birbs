import { red } from "@radix-ui/colors";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Bird, getStatsForBird } from "../database";

interface Props {
  bird: Bird;
}

const COLORS = Object.values(red).reverse();

export default function BirdOverviewStats({ bird }: Props) {
  const stats = getStatsForBird({ bird });

  return (
    <>
      <BarChart
        layout="vertical"
        width={730}
        height={250}
        data={stats.dailyStats}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="category" dataKey="date" />
        <XAxis type="number" />
        <Tooltip />
        <Legend />
        <Bar stackId={1} dataKey="correct" fill="#82ca9d" />
        <Bar stackId={1} dataKey="incorrect" fill="red" />
      </BarChart>
      <PieChart width={730} height={250}>
        <Pie
          data={stats.mistakenFor}
          dataKey="count"
          nameKey="bird"
          fill="#8884d8"
        >
          {stats.mistakenFor.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
}
