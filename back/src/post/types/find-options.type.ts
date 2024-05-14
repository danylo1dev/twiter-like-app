import { PartialType } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';
class PostWhere extends PartialType(Post) {}
class Pagination {
  page: number;
  limit: number;
}
export class findOptions {
  pagination?: Pagination;
  where?: PostWhere;
}
