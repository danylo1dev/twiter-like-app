import { PartialType } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';
export class PostWhere extends PartialType(Post) {}
export class Pagination {
  page: number;
  limit: number;
}
export class findOptions {
  pagination?: Pagination;
  where?: PostWhere;
}
