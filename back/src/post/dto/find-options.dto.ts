import { Pagination, PostWhere } from '../types/find-options.type';

export class FindOptionsDto extends PostWhere implements Pagination {
  page: number;
  limit: number;
}
