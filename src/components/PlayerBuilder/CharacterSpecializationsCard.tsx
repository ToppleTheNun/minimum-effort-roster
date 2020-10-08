import React from "react";

import { CharacterSpecialization } from "../../types/Player";
import Card from "../halfmoon/Card";
import Checkbox from "../halfmoon/Checkbox";
import { useFormContext } from "react-hook-form";

interface CharacterSpecializationsCardProps {
  specializations: CharacterSpecialization[];
}

const CharacterSpecializationsCard = ({
  specializations,
}: CharacterSpecializationsCardProps) => {
  const { register } = useFormContext();
  return (
    <Card>
      {specializations.map((specialization) => (
        <Checkbox
          className="mb-20"
          key={specialization.id}
          id={specialization.id}
          name={specialization.variableName}
          ref={register}
        >
          {specialization.specName} {specialization.className}
        </Checkbox>
      ))}
    </Card>
  );
};

export default CharacterSpecializationsCard;
