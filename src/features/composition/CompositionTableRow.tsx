import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/halfmoon/Button";
import { CharacterSpecialization, Role } from "../../types/Player";

interface CompositionTableRowProps {
  name: string;
  spec: CharacterSpecialization;
}

const CompositionTableRow = ({ name, spec }: CompositionTableRowProps) => {
  const classes = classNames({
    "table-danger": spec.role === Role.TANK,
    "table-secondary":
      spec.role === Role.MELEE_DPS || spec.role === Role.RANGED_DPS,
    "table-primary": spec.role === Role.HEALER,
  });
  return (
    <tr className={classes}>
      <th>{spec.role.replace("_", " ")}</th>
      <td>{name}</td>
      <td>
        {spec.specName} {spec.className}
      </td>
      <td className="text-right">
        <Button className="btn-square rounded-circle">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );
};
export default CompositionTableRow;
