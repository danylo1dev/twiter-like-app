import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUser } from './create-user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(user: CreateUser) {
    return await this.userRepository.create(user);
  }
  async findOneByEmail(email: string) {
    return await this.userRepository.getOneByEmail(email);
  }
  async findOneById(id: string) {
    return await this.userRepository.getOneById(id);
  }
}
