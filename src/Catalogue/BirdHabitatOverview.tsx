import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { Bird, getHabitatForBird } from "../database";

interface Props {
  bird: Bird;
}

export default function BirdHabitatOverview({ bird }: Props) {
  const habitats = getHabitatForBird(bird);

  return habitats.length > 0 ? (
    <RadarChart outerRadius={90} width={730} height={250} data={habitats}>
      <PolarGrid />
      <PolarAngleAxis dataKey="habitat" />
      <PolarRadiusAxis angle={60} domain={[0, 100]} />
      <Tooltip />
      <Radar
        dataKey="proportion"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  ) : null;
}
