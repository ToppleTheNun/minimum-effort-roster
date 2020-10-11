import React, { useMemo } from "react";

import CollapsibleCompositionDetails from "./CollapsibleCompositionDetails";
import { AppDispatch, useTypedSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import { removePlayerById } from "../roster/rosterSlice";

const CompositionRosterList = () => {
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
    <div className="collapse-group m-5">
      {orderedRoster.map((player) => (
        <CollapsibleCompositionDetails
          key={player.id}
          player={player}
          removePlayerById={handleRemovePlayer}
        />
      ))}
    </div>
  );
};

export default CompositionRosterList;
