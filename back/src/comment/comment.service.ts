import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateComment } from './types/create-comment';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}
  async create(createComment: CreateComment) {
    try {
      const exPost = await this.postService.findOne(createComment.postId);
      if (!exPost) {
        throw new NotFoundException(
          `Post with id ${createComment.postId} not found`,
        );
      }

      return await this.commentRepository.create(createComment);
    } catch (err) {
      return err;
    }
  }

  async findAll() {
    return await this.commentRepository.getMany();
  }

  async findOneById(id: string) {
    return await this.commentRepository.getOne(id);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, userId: string) {
    const comment = await this.findOneById(id);
    if (!(comment.userId === userId)) {
      throw new ForbiddenException();
    }
    return await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: string, userId: string) {
    try {
      const exComment = await this.findOneById(id);

      if (!exComment) {
        throw new NotFoundException(`comment with ${id} not found `);
      }
      if (!(exComment.userId === userId)) {
        throw new ForbiddenException();
      }
      return await this.commentRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
