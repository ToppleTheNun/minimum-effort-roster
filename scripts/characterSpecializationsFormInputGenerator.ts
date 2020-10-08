import { writeFileSync } from "fs";
import { join } from "path";

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
// THIS IS A GENERATED FILE

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
writeFileSync(pathToCharacterSpecializationFormInput, classesAndSpecsContents, {
  encoding: "utf-8",
});
