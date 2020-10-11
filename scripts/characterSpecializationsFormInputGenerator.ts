import { writeFileSync } from "fs";
import { join } from "path";
import { format } from "prettier";

import { specializations } from "../src/constants/characterSpecializations";

const orderedSpecializations = specializations.sort((a, b) =>
  a.variableName.localeCompare(b.variableName)
);

const specializationPropertyDefinitions = orderedSpecializations.map(
  (characterSpecialization) => {
    return `${characterSpecialization.variableName}: boolean;`;
  }
);

const classesAndSpecsContents = `
// LAST GENERATED AT ${new Date().toISOString().split("T")[0]}
// GENERATED USING characterSpecializationsFormInputGenerator.ts

export interface CharacterSpecializationFormInput {
${specializationPropertyDefinitions.join("\n")}
}
`.trim();

const pathToCharacterSpecializationFormInput = join(
  __dirname,
  "..",
  "src",
  "types",
  "CharacterSpecializationFormInput.ts"
);
writeFileSync(
  pathToCharacterSpecializationFormInput,
  format(classesAndSpecsContents, { parser: "babel-ts" }),
  {
    encoding: "utf-8",
  }
);
