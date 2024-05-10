import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}
  async create(createLikeDto: CreateLikeDto) {
    return await this.likeRepository.create(createLikeDto);
  }

  async findLikeForPost(postId: string) {
    return await this.likeRepository.getLikeForPost({ postId });
  }

  async findOne(id: string) {
    return await this.likeRepository.getOne(id);
  }

  async update(id: string, updateLikeDto: UpdateLikeDto) {
    return await this.likeRepository.update(id, updateLikeDto);
  }

  async remove(id: string) {
    return await this.likeRepository.delete(id);
  }
}
