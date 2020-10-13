import React, { useState } from "react";
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
import Button, { ButtonColor } from "../../components/halfmoon/Button";
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
import ExportToHasteBinButton from "./ExportToHasteBinButton";
import {
  getRawTextFromHasteBin,
  isHasteBinLink,
  postRawTextToHasteBin,
} from "../../api/rawHastebinApi";
import * as defaultRoster from "../../rosters/roster-oct-13-2020.json";
import ImportDefaultRosterButton from "./ImportDefaultRosterButton";

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
  const [importButtonColor, setImportButtonColor] = useState<
    ButtonColor | undefined
  >();
  const [isImporting, setImporting] = useState(false);

  const exportCode = hookFormMethods.watch("code");

  const handleSuccess = () => {
    setImportButtonColor("success");
    setTimeout(() => {
      setImportButtonColor(undefined);
    }, 1000);
  };

  const handleFailure = () => {
    setImportButtonColor("danger");
    setTimeout(() => {
      setImportButtonColor(undefined);
    }, 1000);
  };

  const handleImportFromInput: SubmitHandler<CompositionFormInput> = async (
    data
  ) => {
    setImporting(true);
    setImportButtonColor(undefined);
    let importCode: string = data.code;
    if (isHasteBinLink(data.code)) {
      try {
        const { data: rawHasteBinContents } = await getRawTextFromHasteBin(
          data.code
        );
        importCode = rawHasteBinContents;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const importData: ImportData = fromBase64(importCode);
      if (importData.composition) {
        dispatch(importComposition(importData.composition));
      }
      if (importData.roster) {
        dispatch(importRoster(importData.roster));
      }
      setImporting(false);
      handleSuccess();
    } catch (err) {
      console.log(err);
      setImporting(false);
      handleFailure();
    }
  };

  const handleExport = () => {
    const exportObj = { composition, roster };
    const exportValue = toBase64(exportObj);
    hookFormMethods.setValue("code", exportValue);
  };

  const handleExportToHasteBin = async () => {
    const exportObj = { composition, roster };
    const exportValue = toBase64(exportObj);
    const { data: rawHasteBinLink } = await postRawTextToHasteBin(exportValue);
    hookFormMethods.setValue("code", rawHasteBinLink);
  };

  return (
    <FormProvider {...hookFormMethods}>
      <Form onSubmit={hookFormMethods.handleSubmit(handleImportFromInput)}>
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
            <Button
              className="w-half"
              color={importButtonColor}
              disabled={isImporting}
              type="submit"
            >
              {isImporting ? "Importing..." : "Import"}
            </Button>
            <Button
              className="w-half"
              disabled={isImporting}
              onClick={handleExport}
              type="button"
            >
              Export
            </Button>
          </div>
          <div className="btn-group w-full" role="group">
            <ImportDefaultRosterButton isImporting={isImporting} />
            <ExportToHasteBinButton
              exportToHasteBin={handleExportToHasteBin}
              isImporting={isImporting}
            />
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
