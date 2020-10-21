import React from "react";
import CompositionTableRow from "./CompositionTableRow";
import { CharacterSpecialization } from "../../types/Player";

interface PlayerAndSpec {
  id: string;
  name: string;
  characterSpec: CharacterSpecialization;
}

interface CompositionTableProps {
  tanks: Array<PlayerAndSpec>;
  healers: Array<PlayerAndSpec>;
  dps: Array<PlayerAndSpec>;
}

const CompositionTable = ({ tanks, healers, dps }: CompositionTableProps) => (
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

export default CompositionTable;
