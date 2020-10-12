export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previousValue, currentValue) => {
    const group = getKey(currentValue);
    if (!previousValue[group]) {
      previousValue[group] = [];
    }
    previousValue[group].push(currentValue);
    return previousValue;
  }, {} as Record<K, T[]>);
