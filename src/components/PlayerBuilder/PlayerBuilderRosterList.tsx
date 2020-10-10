import React from "react";

import useRoster from "../../hooks/useRoster";
import CollapsiblePlayerDetails from "./CollapsiblePlayerDetails";

const PlayerBuilderRosterList = () => {
  const { removePlayerById, roster } = useRoster();
  const orderedRoster = roster.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="collapse-group">
      {orderedRoster.map((player) => (
        <CollapsiblePlayerDetails
          player={player}
          removePlayerById={removePlayerById}
        />
      ))}
    </div>
  );
};

export default PlayerBuilderRosterList;
