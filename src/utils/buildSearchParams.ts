export type Params = Record<string, string | string[]>;

export const buildSearchParams = <T extends Params = Params>(
  params: T,
  excludedKeys?: Partial<T>,
) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (excludedKeys && key in excludedKeys && excludedKeys[key as keyof typeof excludedKeys] === value) {
      return;
    }

    if (Array.isArray(value)) {
      const currentKey = `${key}[]`;
      searchParams.delete(currentKey);
      value.forEach((item) => {
        searchParams.append(currentKey, String(item));
      });
    } else {
      searchParams.set(key, String(value));
    }
  });

  return searchParams;
};
