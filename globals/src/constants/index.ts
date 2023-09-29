export { default as codes } from "./codes";
export const operators = [
    "<",
    "<=",
    "==",
    "!=",
    ">=",
    ">",
    "array-contains",
    "in",
    "not-in",
    "array-contains-any",
] as const;

export const KB = 1000;
export const MB = 1000 * KB;
export const GB = 1000 * MB;
export const TB = 1000 * GB;
