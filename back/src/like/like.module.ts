import { Module } from '@nestjs/common';
import { AuthJwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PostRepository } from 'src/post/post.repository';
import { PostService } from 'src/post/post.service';
import { UserRepository } from 'src/user/user.repository';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';

@Module({
  controllers: [LikeController],
  providers: [
    LikeService,
    LikeRepository,
    FirebaseService,
    PostService,
    PostRepository,
    JwtStrategy,
    AuthJwtGuard,
    FirebaseService,
    UserRepository,
  ],
})
export class LikeModule {}
