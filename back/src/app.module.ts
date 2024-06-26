import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import firebaseConfig from './config/firebase.config';
import { FirebaseModule } from './firebase/firebase.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [firebaseConfig],
      expandVariables: true,
    }),
    FirebaseModule,
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
