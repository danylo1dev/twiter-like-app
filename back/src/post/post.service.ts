import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { CreatePost } from './types/create-post.interface';
import { findOptions } from './types/find-options.type';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async create(createPostDto: CreatePost) {
    return await this.postRepository.create(createPostDto);
  }

  async findAll(options?: findOptions) {
    return await this.postRepository.getMany(options);
  }

  async findOne(id: string) {
    return await this.postRepository.getOne(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const post = await this.findOne(id);
    if (!(post.userId === userId)) {
      throw new ForbiddenException();
    }
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string, userId: string) {
    try {
      const exPost = await this.findOne(id);
      if (!exPost) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }
      if (exPost.userId !== userId) {
        throw new ForbiddenException();
      }
      return await this.postRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
