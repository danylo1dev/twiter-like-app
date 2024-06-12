import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { StoreService } from 'src/store/store.service';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, FirebaseService, StoreService],
})
export class PostModule {}
