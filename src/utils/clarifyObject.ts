type ClarifiedObject<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

export const clarifyObject = <T extends object>(obj: T): ClarifiedObject<T> => {
  const clarifiedObject = {} as ClarifiedObject<T>;

  Object.entries(obj).forEach(([key, value]) => {
    if (value != null) {
      clarifiedObject[key as keyof ClarifiedObject<T>] = value;
    }
  });

  return clarifiedObject as ClarifiedObject<T>;
};
