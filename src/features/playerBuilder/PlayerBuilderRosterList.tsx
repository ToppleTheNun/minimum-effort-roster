import React, { useMemo } from "react";

import CollapsiblePlayerDetails from "./CollapsiblePlayerDetails";
import { AppDispatch, useTypedSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import { removePlayerById } from "../roster/rosterSlice";

const PlayerBuilderRosterList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const roster = useTypedSelector((state) => state.roster.players);
  const orderedRoster = useMemo(
    () => [...roster].sort((a, b) => a.name.localeCompare(b.name)),
    [roster]
  );

  const handleRemovePlayer = (id: string) => {
    dispatch(removePlayerById(id));
  };

  return (
    <div className="collapse-group">
      {orderedRoster.map((player) => (
        <CollapsiblePlayerDetails
          key={player.id}
          player={player}
          removePlayerById={handleRemovePlayer}
        />
      ))}
    </div>
  );
};

export default PlayerBuilderRosterList;
