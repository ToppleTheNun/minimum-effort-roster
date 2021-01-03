import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { nanoid } from "@reduxjs/toolkit";

import Form from "../../components/halfmoon/Form";
import FormGroup from "../../components/halfmoon/FormGroup";
import Input from "../../components/halfmoon/Input";
import FormRow from "../../components/halfmoon/FormRow";
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
import Button from "../../components/halfmoon/Button";
import {
  playerBuilderFormDefaults,
  playerBuilderFormSchema,
} from "./yupSchemas";
import { CharacterSpecialization, Player } from "../../types/Player";
import { isDefined } from "../../typeGuards";
import { CharacterSpecializationFormInput } from "./CharacterSpecializationFormInput";
import { useDispatch } from "react-redux";
import { AppDispatch, useTypedSelector } from "../../app/store";
import { savePlayer } from "../roster/rosterSlice";
import { specializationsDefaults } from "../../schemas/characterSpecializations";

interface PlayerBuilderFormInput extends CharacterSpecializationFormInput {
  playerName: string;
}

const PlayerBuilderForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const editingPlayer = useTypedSelector(
    (state) => state.playerBuilder.editingPlayer
  );
  const roster = useTypedSelector((state) => state.roster.players);
  const { reset, ...hookFormMethods } = useForm<PlayerBuilderFormInput>({
    defaultValues: playerBuilderFormDefaults,
    mode: "all",
    resolver: zodResolver(playerBuilderFormSchema),
  });
  const onSubmit: SubmitHandler<PlayerBuilderFormInput> = (data) => {
    const characterSpecializations: CharacterSpecialization[] = (Object.keys(
      data
    ) as Array<keyof typeof data>)
      .filter((spec) => data[spec])
      .map((spec) => specializations.find((it) => it.variableName === spec))
      .filter(isDefined);

    const playerToSave: Player = {
      id: editingPlayer ?? nanoid(),
      name: data.playerName,
      characterSpecializations,
    };

    dispatch(savePlayer(playerToSave));
  };

  useEffect(() => {
    const editingPlayerById = roster.find((it) => it.id === editingPlayer);
    if (editingPlayerById) {
      const specializationsValues = { ...specializationsDefaults };
      (Object.keys(specializationsValues) as Array<
        keyof typeof specializationsValues
      >).forEach((key) => {
        specializationsValues[key] =
          editingPlayerById.characterSpecializations.findIndex(
            (it) => it.variableName === key
          ) !== -1;
      });
      reset({
        playerName: editingPlayerById.name,
        ...specializationsValues,
      });
    } else {
      reset(playerBuilderFormDefaults);
    }
  }, [editingPlayer, reset, roster]);

  return (
    <FormProvider reset={reset} {...hookFormMethods}>
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
          <div className="form-text">
            Not character name, but name that the <strong>player</strong> goes by.
          </div>
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
      {process.env.NODE_ENV === "development" && (
        <DevTool control={hookFormMethods.control} />
      )}
    </FormProvider>
  );
};

export default PlayerBuilderForm;
