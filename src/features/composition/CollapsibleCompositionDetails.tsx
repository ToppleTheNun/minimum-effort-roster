import React from "react";
import classNamesBind from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Player } from "../../types/Player";
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "../../app/store";
import { closePlayerDetails, openPlayerDetails } from "./compositionSlice";
import Button from "../../components/halfmoon/Button";
import Switch from "../../components/halfmoon/Switch";

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
    (state) => state.playerBuilder.playerDetails[player.id]
  );
  const isOpen = playerDetails?.open ?? true;

  const handleOnSummaryClick = () => {
    const actionToDispatch = isOpen ? closePlayerDetails : openPlayerDetails;
    dispatch(actionToDispatch([player.id]));
  };

  return (
    <details className="collapse-panel" open={isOpen}>
      <summary className="collapse-header" onClick={handleOnSummaryClick}>
        {player.name}
      </summary>
      <div className="collapse-content">
        {player.characterSpecializations.map((spec) => (
          <div className="row mb-10 mt-10" key={spec.id}>
            <div className="col-auto">
              <Switch
                className={cx("character-spec-switch")}
                id={`${spec.id}-enabled`}
              >
                {spec.specName} {spec.className}
              </Switch>
            </div>
            <div className="col-auto ml-auto">
              <Button className="btn-square rounded-circle" type="button">
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
