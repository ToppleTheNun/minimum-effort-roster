import React from "react";
import { useDispatch } from "react-redux";

import Button from "../../components/halfmoon/Button";
import { Player } from "../../types/Player";
import { AppDispatch, useTypedSelector } from "../../app/store";
import {
  closePlayerDetails,
  openPlayerDetails,
  editPlayer,
} from "./playerBuilderSlice";

interface CollapsiblePlayerDetailsProps {
  player: Player;
  removePlayerById: (id: string) => void;
}

const CollapsiblePlayerBuilderDetails = ({
  player,
  removePlayerById,
}: CollapsiblePlayerDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const playerDetails = useTypedSelector(
    (state) => state.playerBuilder.playerDetails[player.id]
  );
  const isOpen = playerDetails?.open ?? true;

  const handleEditOnClick = () => {
    dispatch(editPlayer(player.id));
  };

  const handleRemoveOnClick = () => {
    removePlayerById(player.id);
  };

  const handleSummaryOnClick: React.ReactEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    const actionToDispatch = isOpen ? closePlayerDetails : openPlayerDetails;
    dispatch(actionToDispatch([player.id]));
  };

  return (
    <details className="collapse-panel" open={isOpen}>
      <summary className="collapse-header" onClick={handleSummaryOnClick}>
        {player.name}
      </summary>
      <div className="collapse-content">
        <ul>
          {player.characterSpecializations.map((spec) => (
            <li key={spec.id}>
              {spec.specName} {spec.className}
            </li>
          ))}
        </ul>
        <div className="btn-group" role="group" aria-label="Player Actions">
          <Button color="danger" onClick={handleRemoveOnClick} type="button">
            Delete
          </Button>
          <Button onClick={handleEditOnClick} type="button">
            Edit
          </Button>
        </div>
      </div>
    </details>
  );
};

export default CollapsiblePlayerBuilderDetails;
