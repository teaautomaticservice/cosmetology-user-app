export const fromEntityToOptionsList = <T extends { id: string | number; name: string | number }>(list: T[]) =>
  list.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
