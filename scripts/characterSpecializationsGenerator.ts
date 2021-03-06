import { writeFileSync } from "fs";
import { join } from "path";
import { format } from "prettier";

import { specializations } from "../src/constants/characterSpecializations";

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previousValue, currentValue) => {
    const group = getKey(currentValue);
    if (!previousValue[group]) {
      previousValue[group] = [];
    }
    previousValue[group].push(currentValue);
    return previousValue;
  }, {} as Record<K, T[]>);

const camelCase = (str: string): string =>
  str
    .replace(/\s(.)/g, (found) => found.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/g, (found) => found.toLowerCase());

const unique = <T>(list: T[]): T[] =>
  list.filter((x, i, a) => a.indexOf(x) === i);

const classes = unique(specializations.map((spec) => spec.className));

const specializationsByClass = groupBy(
  specializations,
  (specialization) => specialization.className
);

const individualSpecializationConstDefinitions = specializations
  .sort((a, b) => a.variableName.localeCompare(b.variableName))
  .map((characterSpecialization) => {
    const classNameSection = `className: "${characterSpecialization.className}"`;
    const idSection = `id: "${characterSpecialization.id}"`;
    const specNameSection = `specName: "${characterSpecialization.specName}"`;
    const roleSection = `role: Role.${characterSpecialization.role}`;
    const variableNameSection = `variableName: "${characterSpecialization.variableName}"`;
    const joinedObject = `{${classNameSection},${idSection},${specNameSection},${roleSection},${variableNameSection}}`;
    return `export const ${characterSpecialization.variableName}: CharacterSpecialization = ${joinedObject};`;
  });

const specializationByClassConstDefinitions = classes
  .sort((a, b) => a.localeCompare(b))
  .map((className) => specializationsByClass[className])
  .filter((classSpecializations) => classSpecializations.length > 0)
  .map(
    (classSpecializations) =>
      `export const ${camelCase(
        classSpecializations[0].className
      )}Specializations = [ ${classSpecializations
        .map((it) => it.variableName)
        .join(", ")} ]`
  );

const classesAndSpecsContents = `
// LAST GENERATED AT ${new Date().toISOString().split("T")[0]}
// GENERATED USING characterSpecializationsGenerator.ts

import { CharacterSpecialization, Role } from "../types/Player";

${individualSpecializationConstDefinitions.join("\n")}

export const specializations = [ ${specializations
  .map((it) => it.variableName)
  .join(" ,")} ];

${specializationByClassConstDefinitions.join("\n")}
`.trim();

const pathToClassesAndSpecs = join(
  __dirname,
  "..",
  "src",
  "constants",
  "characterSpecializations.ts"
);
writeFileSync(
  pathToClassesAndSpecs,
  format(classesAndSpecsContents, { parser: "babel-ts" }),
  {
    encoding: "utf-8",
  }
);
