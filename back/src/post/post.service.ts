import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { CreatePost } from './types/create-post.interface';
import { UpdatePost } from './types/update-post.interface';
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

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string) {
    return await this.postRepository.delete(id);
  }
}
