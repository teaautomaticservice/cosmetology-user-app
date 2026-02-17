export const inputFormatter = (value: number | undefined) => {
  if (!value) {
    return String(value ?? '');
  }
  return String(Number(value).toFixed(2));
};
