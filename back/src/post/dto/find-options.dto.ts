import { IsNumberString, IsOptional } from 'class-validator';
import { Pagination, PostWhere } from '../types/find-options.type';

export class FindOptionsDto extends PostWhere implements Pagination {
  @IsOptional()
  @IsNumberString()
  page: number;
  @IsNumberString()
  @IsOptional()
  limit: number;
}
