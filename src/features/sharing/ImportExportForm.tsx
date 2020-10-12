import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

import Form from "../../components/halfmoon/Form";
import Input from "../../components/halfmoon/Input";
import {
  compositionFormDefaults,
  compositionFormSchema,
} from "../composition/yupSchemas";
import InvalidFeedback from "../../components/halfmoon/InvalidFeedback";
import Button from "../../components/halfmoon/Button";
import FormGroup from "../../components/halfmoon/FormGroup";
import { AppDispatch, useTypedSelector } from "../../app/store";
import { fromBase64, toBase64 } from "../../utils/base64";
import CopyExportButton from "./CopyExportButton";
import {
  CharacterSpecInComp,
  importComposition,
} from "../composition/compositionSlice";
import { Player } from "../../types/Player";
import { useDispatch } from "react-redux";
import { importRoster } from "../roster/rosterSlice";

interface CompositionFormInput {
  code: string;
}

interface ImportData {
  composition?: Record<string, CharacterSpecInComp>;
  roster?: Player[];
}

const ImportExportForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hookFormMethods = useForm<CompositionFormInput>({
    criteriaMode: "all",
    defaultValues: compositionFormDefaults,
    mode: "all",
    resolver: yupResolver(compositionFormSchema),
  });
  const composition = useTypedSelector(
    (state) => state.composition.composition
  );
  const roster = useTypedSelector((state) => state.roster.players);

  const exportCode = hookFormMethods.watch("code");

  const handleImport: SubmitHandler<CompositionFormInput> = (data) => {
    const importData: ImportData = fromBase64(data.code);
    if (importData.composition) {
      dispatch(importComposition(importData.composition));
    }
    if (importData.roster) {
      dispatch(importRoster(importData.roster));
    }
  };

  const handleExport = () => {
    const exportObj = { composition, roster };
    const exportValue = toBase64(exportObj);
    hookFormMethods.setValue("code", exportValue);
  };

  return (
    <FormProvider {...hookFormMethods}>
      <Form onSubmit={hookFormMethods.handleSubmit(handleImport)}>
        <FormGroup>
          <label htmlFor="number-of-tanks">Import Roster and Composition</label>
          {hookFormMethods.errors.code && (
            <InvalidFeedback errors={[hookFormMethods.errors.code.message]} />
          )}
          <div className="input-group">
            <Input
              id="code"
              name="code"
              placeholder="Roster and composition code"
              ref={hookFormMethods.register}
              type="text"
            />
            {exportCode && <CopyExportButton exportCode={exportCode} />}
          </div>
          <div className="form-text">
            <strong>Import</strong> a roster and composition that has already
            been <strong>Export</strong>ed.
          </div>
        </FormGroup>
        <FormGroup className="mb-0">
          <div className="btn-group w-full" role="group">
            <Button className="w-half" type="submit">
              Import
            </Button>
            <Button className="w-half" onClick={handleExport} type="button">
              Export
            </Button>
          </div>
        </FormGroup>
      </Form>
      {process.env.NODE_ENV === "development" && (
        <DevTool control={hookFormMethods.control} />
      )}
    </FormProvider>
  );
};

export default ImportExportForm;
