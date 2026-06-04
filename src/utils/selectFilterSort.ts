import { DefaultOptionType } from 'antd/es/select';

export const selectFilterSort = (optionA: DefaultOptionType, optionB: DefaultOptionType): number => {
  const labelA = String(optionA?.label || '');
  const labelB = String(optionB?.label || '');
  return labelA.toLowerCase().localeCompare(labelB.toLowerCase());
};
