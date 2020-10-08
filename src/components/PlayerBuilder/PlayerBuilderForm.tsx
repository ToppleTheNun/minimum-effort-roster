import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { v4 as uuidv4 } from "uuid";

import Form from "../halfmoon/Form";
import FormGroup from "../halfmoon/FormGroup";
import Input from "../halfmoon/Input";
import FormRow from "../halfmoon/FormRow";
import CharacterSpecializationsCard from "./CharacterSpecializationsCard";
import {
  deathKnightSpecializations,
  demonHunterSpecializations,
  druidSpecializations,
  hunterSpecializations,
  mageSpecializations,
  monkSpecializations,
  paladinSpecializations,
  priestSpecializations,
  rogueSpecializations,
  shamanSpecializations,
  specializations,
  warlockSpecializations,
  warriorSpecializations,
} from "../../constants/characterSpecializations";
import Button from "../halfmoon/Button";
import useRoster from "../../hooks/useRoster";
import { playerBuilderFormDefaults, playerBuilderFormSchema } from "./schema";
import { CharacterSpecialization, Player } from "../../types/Player";
import { isDefined } from "../../typeGuards";
import { CharacterSpecializationFormInput } from "../../types/CharacterSpecializationFormInput";

interface PlayerBuilderFormInput extends CharacterSpecializationFormInput {
  playerName: string;
}

const PlayerBuilderForm = () => {
  const { addPlayer } = useRoster();
  const hookFormMethods = useForm<PlayerBuilderFormInput>({
    defaultValues: playerBuilderFormDefaults,
    mode: "all",
    resolver: yupResolver(playerBuilderFormSchema),
  });
  const onSubmit: SubmitHandler<PlayerBuilderFormInput> = (data) => {
    const characterSpecializations: CharacterSpecialization[] = (Object.keys(
      data
    ) as Array<keyof typeof data>)
      .filter((spec) => data[spec])
      .map((spec) => specializations.find((it) => it.variableName === spec))
      .filter(isDefined);

    const playerToSave: Player = {
      id: uuidv4(),
      name: data.playerName,
      characterSpecializations,
    };

    addPlayer(playerToSave);
    hookFormMethods.reset();
  };

  return (
    <FormProvider {...hookFormMethods}>
      <Form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="player-name" className="required">
            Player Name
          </label>
          <Input
            className="w-400 mw-full"
            id="player-name"
            name="playerName"
            placeholder="Player name"
            ref={hookFormMethods.register}
            required
            type="text"
          />
        </FormGroup>
        <FormRow>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={deathKnightSpecializations}
            />
          </div>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={demonHunterSpecializations}
            />
          </div>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={druidSpecializations}
            />
          </div>
        </FormRow>
        <FormRow>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={hunterSpecializations}
            />
          </div>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={mageSpecializations}
            />
          </div>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={monkSpecializations}
            />
          </div>
        </FormRow>
        <FormRow>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={paladinSpecializations}
            />
          </div>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={priestSpecializations}
            />
          </div>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={rogueSpecializations}
            />
          </div>
        </FormRow>
        <FormRow>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={shamanSpecializations}
            />
          </div>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={warlockSpecializations}
            />
          </div>
          <div className="col">
            <CharacterSpecializationsCard
              specializations={warriorSpecializations}
            />
          </div>
        </FormRow>
        <FormGroup>
          <Button color="primary" type="submit">
            Save
          </Button>
        </FormGroup>
      </Form>
      <DevTool control={hookFormMethods.control} />
    </FormProvider>
  );
};

export default PlayerBuilderForm;
