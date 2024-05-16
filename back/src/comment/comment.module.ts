import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthJwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserRepository } from 'src/user/user.repository';
import { PostService } from 'src/post/post.service';
import { PostModule } from 'src/post/post.module';
import { PostRepository } from 'src/post/post.repository';

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
  ],
})
export class CommentModule {}
