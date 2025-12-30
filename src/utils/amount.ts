const MULTIPLIER = 10000;

export const toAmountApi = (val: number): number => val * MULTIPLIER;
export const fromAmountApi = (val: number | string): string => (Number(val) / MULTIPLIER).toFixed(2);
