import { object, number } from "yup";

export const compositionFormSchema = object().shape({
  tanks: number().required().positive().max(40),
  dps: number().required().positive().max(40),
  healers: number().required().positive().max(40),
});

export const compositionFormDefaults = { tanks: 2, dps: 14, healers: 4 };
