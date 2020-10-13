import preval from "preval.macro";

export const buildDate = preval`module.exports = new Date().toLocaleString();`;
