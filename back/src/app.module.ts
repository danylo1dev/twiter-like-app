import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import firebaseConfig from './config/firebase.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [FirebaseModule.forRoot({ myData: 'dkaksda' })],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [firebaseConfig],
      expandVariables: true,
    }),
    FirebaseModule.forRoot(firebaseConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
