import { birds } from "../database/birds";

interface Props {
  value: string;
  onChange: (habitat: string) => void;
}

export default function BirdSelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {birds.map((bird) => (
        <option value={bird}>{bird}</option>
      ))}
    </select>
  );
}
