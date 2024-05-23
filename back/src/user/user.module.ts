import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import firebaseConfig from 'src/config/firebase.config';

@Module({
  providers: [UserService, UserRepository, FirebaseService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
