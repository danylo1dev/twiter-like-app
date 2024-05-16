import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '../types/pagination.type';

export class PaginationDto implements Pagination {
  @ApiProperty({
    example: 'Current page',
    type: Number,
  })
  page: number;
  @ApiProperty({
    example: 'Max element per page',
    type: Number,
  })
  limit: number;
}
