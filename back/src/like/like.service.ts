import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeRepository } from './like.repository';
import { CreateLike } from './types/create-like.type';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postService: PostService,
  ) {}
  async create(createLikeDto: CreateLike) {
    const post = await this.postService.findOne(createLikeDto.postId);
    if (!post) {
      throw new NotFoundException(
        `Post with id ${createLikeDto.postId} not found `,
      );
    }
    return await this.likeRepository.create(createLikeDto);
  }

  async countLikeOnPost(postId: string) {
    return (await this.likeRepository.getLikeForPost({ postId })).length;
  }

  async findOne(id: string) {
    return await this.likeRepository.getOne(id);
  }

  async remove(id: string, userId: string) {
    const exPost = await this.findOne(id);
    if (!exPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    if (exPost.userId !== userId) {
      throw new ForbiddenException();
    }
    return await this.likeRepository.delete(id);
  }
}
