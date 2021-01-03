import { writeFileSync } from "fs";
import { join } from "path";

import { specializations } from "../src/constants/characterSpecializations";
import { format } from "prettier";

const orderedSpecializations = specializations.sort((a, b) =>
  a.variableName.localeCompare(b.variableName)
);

const specializationSchemaConstDefinitions = orderedSpecializations.map(
  (characterSpecialization) => {
    return `export const ${characterSpecialization.variableName} = z.boolean();`;
  }
);

const allSpecializationsSchemaConstDefinition = `export const specializations = { ${orderedSpecializations
  .map((spec) => spec.variableName)
  .join(", ")} };`;

const allSpecializationsDefaults = `export const specializationsDefaults = { ${orderedSpecializations
  .map((spec) => `${spec.variableName}: false`)
  .join(", ")} };`;

const classesAndSpecsContents = `
// LAST GENERATED AT ${new Date().toISOString().split("T")[0]}
// GENERATED USING characterSpecializationsSchemaGenerator.ts

import * as z from "zod";

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
writeFileSync(pathToClassesAndSpecs, format(classesAndSpecsContents, { parser: "babel-ts" }), {
  encoding: "utf-8",
});
