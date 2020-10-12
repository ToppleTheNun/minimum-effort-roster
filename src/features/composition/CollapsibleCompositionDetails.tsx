import React from "react";
import { useDispatch } from "react-redux";
import classNamesBind from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Player } from "../../types/Player";
import { AppDispatch, useTypedSelector } from "../../app/store";
import {
  closePlayerDetails,
  openPlayerDetails,
  addPlayerSpec,
} from "./compositionSlice";
import Button from "../../components/halfmoon/Button";

import styles from "./CollapsibleCompositionDetails.module.css";

interface CollapsiblePlayerDetailsProps {
  player: Player;
  removePlayerById: (id: string) => void;
}

const cx = classNamesBind.bind(styles);

const CollapsibleCompositionDetails = ({
  player,
}: CollapsiblePlayerDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const playerDetails = useTypedSelector(
    (state) => state.composition.playerDetails[player.id]
  );
  const isOpen = playerDetails?.open;

  const handleOnSummaryClick: React.ReactEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    const actionToDispatch = isOpen ? closePlayerDetails : openPlayerDetails;
    dispatch(actionToDispatch([player.id]));
  };

  const handleOnPlusClick: (
    specId: string
  ) => React.MouseEventHandler<HTMLButtonElement> = (specId) => {
    return () => {
      dispatch(addPlayerSpec({ playerId: player.id, specId }));
    };
  };

  return (
    <details className="collapse-panel" open={isOpen}>
      <summary className="collapse-header" onClick={handleOnSummaryClick}>
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
                onClick={handleOnPlusClick(spec.id)}
                type="button"
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
};

export default CollapsibleCompositionDetails;
