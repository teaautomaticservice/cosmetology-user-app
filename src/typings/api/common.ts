export interface Pagination {
  itemsCount: number;
  itemsCurrent: [number, number];
}

export interface Meta {
  pagination: Pagination;
}

export interface List<CurrentType> {
  data: CurrentType[];
  meta: Meta;
}
