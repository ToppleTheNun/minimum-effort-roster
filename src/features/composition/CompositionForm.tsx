import React  from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

import Form from "../../components/halfmoon/Form";
import Input from "../../components/halfmoon/Input";
import { compositionFormDefaults, compositionFormSchema } from "./yupSchemas";
import InvalidFeedback from "../../components/halfmoon/InvalidFeedback";
import Button from "../../components/halfmoon/Button";
import FormGroup from "../../components/halfmoon/FormGroup";

interface CompositionFormInput {
  tanks: number;
  dps: number;
  healers: number;
}

const CompositionForm = () => {
  const { reset, ...hookFormMethods } = useForm<CompositionFormInput>({
    criteriaMode: "all",
    defaultValues: compositionFormDefaults,
    mode: "all",
    resolver: yupResolver(compositionFormSchema),
  });
  const onSubmit: SubmitHandler<CompositionFormInput> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider reset={reset} {...hookFormMethods}>
      <Form onSubmit={hookFormMethods.handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="number-of-tanks" className="required">
            Number of Tanks
          </label>
          {hookFormMethods.errors.tanks && (
            <InvalidFeedback errors={[hookFormMethods.errors.tanks.message]} />
          )}
          <Input
            id="number-of-tanks"
            inputMode="numeric"
            name="tanks"
            pattern="[0-9]*"
            placeholder="Number of tanks"
            ref={hookFormMethods.register}
            required
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="number-of-healers" className="required">
            Number of Healers
          </label>
          {hookFormMethods.errors.healers && (
            <InvalidFeedback
              errors={[hookFormMethods.errors.healers.message]}
            />
          )}
          <Input
            id="number-of-healers"
            inputMode="numeric"
            name="healers"
            pattern="[0-9]*"
            placeholder="Number of healers"
            ref={hookFormMethods.register}
            required
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="number-of-dps" className="required">
            Number of DPS
          </label>
          {hookFormMethods.errors.dps && (
            <InvalidFeedback errors={[hookFormMethods.errors.dps.message]} />
          )}
          <Input
            id="number-of-dps"
            inputMode="numeric"
            name="dps"
            pattern="[0-9]*"
            placeholder="Number of DPS"
            ref={hookFormMethods.register}
            required
            type="text"
          />
        </FormGroup>
        <FormGroup className="mb-0">
          <Button color="primary" className="w-full" type="submit">
            Randomize
          </Button>
        </FormGroup>
      </Form>
      {process.env.NODE_ENV === "development" && (
        <DevTool control={hookFormMethods.control} />
      )}
    </FormProvider>
  );
};

export default CompositionForm;
