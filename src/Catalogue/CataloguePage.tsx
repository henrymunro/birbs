import { useState } from "react";
import { birds as allBirds } from "../database";
import { Input, Separator, Stack } from "../components";
import BirdOverview from "./BirdOverview";

export default function CataloguePage() {
  const [birds, setBirds] = useState(allBirds);

  return (
    <div>
      <Stack spaced>
        <Input
          placeholder="Search"
          onChange={(e) =>
            setBirds(
              allBirds.filter((b) =>
                b
                  .replace(/\s-/g, "")
                  .includes(e.target.value.toLowerCase().replace(/\s/g, ""))
              )
            )
          }
        />
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
