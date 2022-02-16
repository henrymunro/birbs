import { habitats } from "../database/birds";

interface Props {
  onChange: (habitat: string | null) => void;
}

export default function HabitSelect({ onChange }: Props) {
  return (
    <select
      onChange={(e) =>
        onChange(e.target.value === "All" ? null : e.target.value)
      }
    >
      <option value="All">All</option>
      {habitats.map((habitat) => (
        <option value={habitat}>{habitat}</option>
      ))}
    </select>
  );
}
