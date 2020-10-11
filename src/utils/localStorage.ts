export const readFromLocalStorage = <T>(key: string): T | undefined => {
  try {
    const serializedObj = localStorage.getItem(key);
    return serializedObj !== null ? JSON.parse(serializedObj) : undefined;
  } catch (err) {
    // ignore this error
    return undefined;
  }
};

export const writeToLocalStorage = <T>(key: string, obj: T) => {
  try {
    const serializedObj = JSON.stringify(obj);
    localStorage.setItem(key, serializedObj);
  } catch (err) {
    // ignore this error
  }
};
