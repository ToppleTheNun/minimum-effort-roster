import { object, string } from "yup";

export const compositionFormSchema = object().shape({
  code: string(),
});

export const compositionFormDefaults = { code: "" };
