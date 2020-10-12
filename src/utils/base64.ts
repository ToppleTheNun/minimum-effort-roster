export const toBase64 = (obj: any): string => {
  const stringified = JSON.stringify(obj);
  return btoa(stringified);
};

export const fromBase64 = <T>(str: string): T => {
  const converted = atob(str);
  return JSON.parse(converted);
};
