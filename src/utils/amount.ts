const MULTIPLIER = 10000;

export const toAmountApi = (val: number): number => {
  const amount = val * MULTIPLIER;
  return Number(amount.toFixed(0));
};
export const fromAmountApi = (val: number | string): string => (Number(val) / MULTIPLIER).toFixed(2);
