import { Module } from '@nestjs/common';
import { AuthJwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PostRepository } from 'src/post/post.repository';
import { PostService } from 'src/post/post.service';
import { UserRepository } from 'src/user/user.repository';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { StoreService } from 'src/store/store.service';

@Module({
  imports: [FirebaseModule],
  controllers: [CommentController],
  providers: [
    CommentService,
    FirebaseService,
    JwtStrategy,
    AuthJwtGuard,
    UserRepository,
    CommentRepository,
    PostService,
    PostRepository,
    StoreService,
  ],
})
export class CommentModule {}
