import { DefaultOptionType } from 'antd/es/select';

export const selectFIlterOption = (input: string, option: DefaultOptionType | undefined): boolean => {
  const label = option?.label || '';
  return String(label).toLowerCase().includes(input.toLowerCase());
};
