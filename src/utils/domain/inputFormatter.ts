export const inputFormatter = (value: number | string | undefined): string => {
  if (!value) {
    return String(value ?? '');
  }
  return String(Number(value).toFixed(2));
};
