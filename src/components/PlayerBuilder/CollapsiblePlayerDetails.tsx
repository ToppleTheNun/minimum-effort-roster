import React from "react";

import Button from "../halfmoon/Button";
import { Player } from "../../types/Player";

interface CollapsiblePlayerDetailsProps {
  player: Player;
  removePlayerById: (id: string) => void;
}

const CollapsiblePlayerDetails = ({
  player,
  removePlayerById,
}: CollapsiblePlayerDetailsProps) => {
  const handleRemoveOnClick = () => {
    removePlayerById(player.id);
  };

  return (
    <details className="collapse-panel">
      <summary className="collapse-header">{player.name}</summary>
      <div className="collapse-content">
        <ul>
          {player.characterSpecializations.map((spec) => (
            <li key={spec.id}>
              {spec.specName} {spec.className}
            </li>
          ))}
        </ul>
        <Button color="danger" onClick={handleRemoveOnClick} type="button">
          Delete
        </Button>
      </div>
    </details>
  );
};

export default CollapsiblePlayerDetails;
