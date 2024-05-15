import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import authJwtConfig from '../config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthLocalGuard } from './guards/local-auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: authJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    FirebaseService,
    UserRepository,
    JwtStrategy,
    LocalStrategy,
    AuthLocalGuard,
    AuthJwtGuard,
  ],
})
export class AuthModule {}
