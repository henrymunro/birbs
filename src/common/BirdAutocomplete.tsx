import Autocomplete from "@mui/material/Autocomplete";
import { birds as allBirds } from "../database";
import TextField from "@mui/material/TextField";

interface Props {
  value?: string | null;
  onChange: (value: string | null) => void;
  birds?: string[];
}

export default function BirdAutocomplete({
  value,
  onChange,
  birds = allBirds,
}: Props) {
  return (
    <Autocomplete
      value={value}
      disablePortal
      id="combo-box-demo"
      onChange={(e, val) => onChange(val)}
      options={birds}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Bird" />}
    />
  );
}
