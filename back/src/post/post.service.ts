import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { CreatePost } from './types/create-post.interface';
import { findOptions } from './types/find-options.type';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly storage: StoreService,
  ) {}
  async create(createPostDto: CreatePost, file: Buffer) {
    try {
      const filepath = await this.storage.uploadImage(
        `posts/${Date.now()}-${createPostDto.userId}`,
        file,
      );
      return await this.postRepository.create({
        ...createPostDto,
        fileUrl: filepath,
      });
    } catch (err) {
      throw err;
    }
  }

  async findAll(options?: findOptions) {
    const posts = await this.postRepository.getMany(options);
    const res = [];
    for (const post of posts) {
      const likeCount = await this.postRepository.getLikesCountForPost(post.id);
      res.push({
        ...post,
        likeCount,
      });
    }
    return res;
  }

  async findOne(id: string): Promise<any> {
    const post = await this.postRepository.getOne(id);
    const likeCount = await this.postRepository.getLikesCountForPost(id);
    return {
      ...post,
      id,
      likeCount,
    };
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
  async createPostLike(postLike: any) {
    await this.postRepository.createPostLike(postLike);
    return { post: postLike };
  }
}
