import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, FirebaseService],
})
export class PostModule {}
