export type OptionOfList = {
  value: string | number;
  label: string | number;
}

export const fromEntityToOptionsList = <T extends {
  id: string | number;
  name: string | number;
}>(list: T[]): OptionOfList[] =>
    list.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
