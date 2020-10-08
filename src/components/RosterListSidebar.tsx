import React from "react";

import useRoster from "../hooks/useRoster";
import Card from "./halfmoon/Card";
import CardTitle from "./halfmoon/CardTitle";

const RosterListSidebar = () => {
  const { roster } = useRoster();
  const orderedRoster = roster.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {orderedRoster.map((player, idx) => (
        <Card key={player.id}>
          <CardTitle>{player.name}</CardTitle>
          {player.characterSpecializations.map((spec) => (
            <p>
              {spec.specName} {spec.className}
            </p>
          ))}
        </Card>
      ))}
    </>
  );
};

export default RosterListSidebar;
