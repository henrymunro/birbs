import { useState, useEffect } from "react";
import { getBirds } from "../database";
import { Input, Separator, Stack } from "../components";
import BirdOverview from "./BirdOverview";
import HabitSelect from "./HabitatSelect";

export default function CataloguePage() {
  const [habitat, setHabitat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [birds, setBirds] = useState(getBirds({ habitat }));

  useEffect(() => {
    const nextBirds = getBirds({ habitat }).filter((b) =>
      b
        .replace(/\s-/g, "")
        .includes(searchTerm?.toLowerCase().replace(/\s/g, "") || "")
    );

    setBirds(nextBirds);
  }, [habitat, searchTerm]);

  return (
    <div>
      <Stack spaced>
        <Input
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <HabitSelect onChange={setHabitat} />
      </Stack>
      {birds.map((bird) => (
        <div key={bird}>
          <BirdOverview bird={bird} />
          <Separator css={{ marginTop: "$3" }} />
        </div>
      ))}
    </div>
  );
}
