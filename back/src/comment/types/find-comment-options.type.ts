import { PartialType } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';
import { Pagination } from 'src/shared/types/pagination.type';
export class CommentWhere extends PartialType(Comment) {}
export class CommentFindOptions {
  pagination?: Pagination;
  where?: CommentWhere;
}
