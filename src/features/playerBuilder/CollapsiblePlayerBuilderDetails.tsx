import React from "react";
import { useDispatch } from "react-redux";
import classNamesBind from "classnames/bind";

import Button from "../../components/halfmoon/Button";
import { Player } from "../../types/Player";
import { AppDispatch, useTypedSelector } from "../../app/store";
import {
  closePlayerDetails,
  openPlayerDetails,
  editPlayer,
} from "./playerBuilderSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./CollapsiblePlayerBuilderDetails.module.css";
import { removeSpecFromPlayer } from "../roster/rosterSlice";

interface CollapsiblePlayerDetailsProps {
  player: Player;
  removePlayerById: (id: string) => void;
}

const cx = classNamesBind.bind(styles);

const CollapsiblePlayerBuilderDetails = ({
  player,
  removePlayerById,
}: CollapsiblePlayerDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const playerDetails = useTypedSelector(
    (state) => state.playerBuilder.playerDetails[player.id]
  );
  const isOpen = playerDetails?.open;

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

  const handleOnDeleteSpecClick = (specId: string): React.MouseEventHandler => {
    return () => {
      dispatch(removeSpecFromPlayer({ playerId: player.id, specId }));
    };
  };

  return (
    <details className="collapse-panel" open={isOpen}>
      <summary className="collapse-header" onClick={handleSummaryOnClick}>
        {player.name}
      </summary>
      <div className="collapse-content">
        {player.characterSpecializations.map((spec) => (
          <div className="row mb-10 mt-10" key={spec.id}>
            <div className={cx("col-auto", "character-spec-div")}>
              {spec.specName} {spec.className}
            </div>
            <div className="col-auto ml-auto">
              <Button
                aria-label="Add"
                className="btn-square rounded-circle"
                onClick={handleOnDeleteSpecClick(spec.id)}
                type="button"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
        ))}
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
