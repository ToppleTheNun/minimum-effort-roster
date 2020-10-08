import { writeFileSync } from "fs";
import { join } from "path";

import { specializations } from "../src/constants/characterSpecializations";

const orderedSpecializations = specializations.sort((a, b) =>
  a.variableName.localeCompare(b.variableName)
);

const specializationSchemaConstDefinitions = orderedSpecializations.map(
  (characterSpecialization) => {
    return `export const ${characterSpecialization.variableName}: BooleanSchema = boolean().required();`;
  }
);

const allSpecializationsSchemaConstDefinition = `export const specializations = { ${orderedSpecializations
  .map((spec) => spec.variableName)
  .join(", ")} };`;

const allSpecializationsDefaults = `export const specializationsDefaults = { ${orderedSpecializations
  .map((spec) => `${spec.variableName}: false`)
  .join(", ")} };`;

const classesAndSpecsContents = `
// THIS IS A FILE THAT WAS GENERATED BY A SCRIPT,
// HENCE THE RANDOMLY GENERATED UUID VALUES FOR THE
// ID FIELDS

import { boolean, BooleanSchema } from "yup";

${specializationSchemaConstDefinitions.join("\n")}
${allSpecializationsSchemaConstDefinition}
${allSpecializationsDefaults}
`.trim();

const pathToClassesAndSpecs = join(
  __dirname,
  "..",
  "src",
  "schemas",
  "characterSpecializations.ts"
);
writeFileSync(pathToClassesAndSpecs, classesAndSpecsContents, {
  encoding: "utf-8",
});
