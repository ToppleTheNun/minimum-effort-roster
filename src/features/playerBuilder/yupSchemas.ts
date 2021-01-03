import {
  specializations,
  specializationsDefaults,
} from "../../schemas/characterSpecializations";

import * as z from "zod";

export const playerBuilderFormSchema = z.object({
  ...specializations,
  playerName: z.string(),
});

export const playerBuilderFormDefaults = {
  ...specializationsDefaults,
  playerName: "",
};
