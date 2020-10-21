import React, { useMemo } from "react";

import { useTypedSelector } from "../../app/store";
import { isDefined } from "../../typeGuards";
import { CharacterSpecialization } from "../../types/Player";
import { groupBy } from "../../utils/arrays";
import CompositionTable from "./CompositionTable";

interface PlayerAndSpec {
  id: string;
  name: string;
  characterSpec: CharacterSpecialization;
}

const CompositionDisplay = () => {
  const composition = useTypedSelector(
    (state) => state.composition.composition
  );
  const roster = useTypedSelector((state) => state.roster.players);

  const playersAndSpecsInComposition = useMemo(
    () =>
      (Object.keys(composition) as Array<keyof typeof composition>)
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
          const playerAndSpec: PlayerAndSpec = {
            id: playerId,
            name: foundPlayer.name,
            characterSpec: foundSpec,
          };
          return playerAndSpec;
        })
        .filter(isDefined),
    [composition, roster]
  );
  const playersAndSpecsGroupedByRole = useMemo(
    () =>
      groupBy(
        playersAndSpecsInComposition,
        (playerAndSpec) => playerAndSpec.characterSpec.role
      ),
    [playersAndSpecsInComposition]
  );
  const tanks = useMemo(() => playersAndSpecsGroupedByRole.TANK ?? [], [
    playersAndSpecsGroupedByRole,
  ]);
  const healers = useMemo(() => playersAndSpecsGroupedByRole.HEALER ?? [], [
    playersAndSpecsGroupedByRole,
  ]);
  const dps = useMemo(
    () =>
      (playersAndSpecsGroupedByRole.MELEE_DPS ?? []).concat(
        playersAndSpecsGroupedByRole.RANGED_DPS ?? []
      ),
    [playersAndSpecsGroupedByRole]
  );

  return (
    <>
      <CompositionTable tanks={tanks} healers={healers} dps={dps} />
      <div className="row row-eq-spacing-lg">
        <div className="col-lg-4 text-center text-muted">Tanks: {tanks.length}</div>
        <div className="col-lg-4 text-center text-muted">Healers: {healers.length}</div>
        <div className="col-lg-4 text-center text-muted">DPS: {dps.length}</div>
      </div>
    </>
  );
};

export default CompositionDisplay;
