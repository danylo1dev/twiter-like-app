import { Post } from '../entities/post.entity';

export interface CreatePost {
  text: string;
  userId: string;
  username: string;
}
