import {
  specializations,
  specializationsDefaults,
} from "../../schemas/characterSpecializations";
import { object, string } from "yup";

export const playerBuilderFormSchema = object().shape({
  ...specializations,
  playerName: string().required(),
});

export const playerBuilderFormDefaults = {
  ...specializationsDefaults,
  playerName: "",
};
