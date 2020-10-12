import React, { useMemo } from "react";

import { useTypedSelector } from "../../app/store";
import { isDefined } from "../../typeGuards";
import { CharacterSpecialization } from "../../types/Player";
import { groupBy } from "../../utils/arrays";
import CompositionTableRow from "./CompositionTableRow";

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
    <table className="table">
      <thead>
        <tr>
          <th>Role</th>
          <th>Player Name</th>
          <th>Specialization</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tanks.map((playerAndSpec) => (
          <CompositionTableRow
            id={playerAndSpec.id}
            key={playerAndSpec.id}
            name={playerAndSpec.name}
            spec={playerAndSpec.characterSpec}
          />
        ))}
        {healers.map((playerAndSpec) => (
          <CompositionTableRow
            id={playerAndSpec.id}
            key={playerAndSpec.id}
            name={playerAndSpec.name}
            spec={playerAndSpec.characterSpec}
          />
        ))}
        {dps.map((playerAndSpec) => (
          <CompositionTableRow
            id={playerAndSpec.id}
            key={playerAndSpec.id}
            name={playerAndSpec.name}
            spec={playerAndSpec.characterSpec}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CompositionDisplay;
