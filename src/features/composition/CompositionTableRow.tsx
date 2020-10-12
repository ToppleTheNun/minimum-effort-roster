import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/halfmoon/Button";
import { CharacterSpecialization, Role } from "../../types/Player";
import { AppDispatch } from "../../app/store";
import { removePlayerFromComposition } from "./compositionSlice";

interface CompositionTableRowProps {
  id: string;
  name: string;
  spec: CharacterSpecialization;
}

const CompositionTableRow = ({ id, name, spec }: CompositionTableRowProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const classes = classNames({
    "table-danger": spec.role === Role.TANK,
    "table-secondary":
      spec.role === Role.MELEE_DPS || spec.role === Role.RANGED_DPS,
    "table-primary": spec.role === Role.HEALER,
  });

  const handleRemove = useCallback(() => {
    dispatch(removePlayerFromComposition(id));
  }, [dispatch, id]);

  return (
    <tr className={classes}>
      <th>{spec.role.replace("_", " ")}</th>
      <td>{name}</td>
      <td>
        {spec.specName} {spec.className}
      </td>
      <td className="text-right">
        <Button className="btn-square rounded-circle" onClick={handleRemove}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );
};
export default CompositionTableRow;
