import { PaginationMetaDto } from './generated';

export type Pagination = PaginationMetaDto;

export type UseSort<Keys = string> = {
  sort?: Keys,
  order?: 'ASC' | 'DESC',
};

export type UsePagination = {
  page?: string;
  pageSize?: string;
}
