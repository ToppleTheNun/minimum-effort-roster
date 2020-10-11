import React from "react";

import { useTypedSelector } from "../../app/store";
import { isDefined } from "../../typeGuards";

const CompositionDisplay = () => {
  const composition = useTypedSelector(
    (state) => state.composition.composition
  );
  const roster = useTypedSelector((state) => state.roster.players);

  const playersAndSpecsInComposition = (Object.keys(composition) as Array<
    keyof typeof composition
  >)
    .map((playerId) => {
      const foundPlayer = roster.find((player) => player.id === playerId);
      if (!foundPlayer) {
        return undefined;
      }
      const playerInComp = composition[playerId];
      const foundSpec = foundPlayer.characterSpecializations.find(
        (spec) => spec.id === playerInComp.specId
      );
      if (!foundSpec) {
        return undefined;
      }
      return `${foundPlayer.name} - ${foundSpec.specName} ${foundSpec.className}`;
    })
    .filter(isDefined);

  return (
    <>
      {playersAndSpecsInComposition.map((playerAndSpec) => (
        <p key={playerAndSpec}>{playerAndSpec}</p>
      ))}
    </>
  );
};

export default CompositionDisplay;
