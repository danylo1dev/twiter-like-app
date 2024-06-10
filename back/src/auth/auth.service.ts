import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'firebase-admin/auth';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUser } from 'src/user/create-user.interface';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginByGoogleDto } from './dto/login-by-google.dto';
import { UserRecord } from 'firebase-functions/v1/auth';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class AuthService {
  private firebaseAuth: Auth;
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly storage: StoreService,
  ) {}
  public getTokenForUser(user: any): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.uid,
    });
  }
  async createUser(createAuthDto: RegisterDto, file: Buffer) {
    let exUser;
    try {
      exUser = await this.firebaseService
        .getAuth()
        .getUserByEmail(createAuthDto.email);
    } catch (err) {
      try {
        if (exUser) {
          throw new ForbiddenException(
            `User with ${createAuthDto.email} alredy exist`,
          );
        }
        const user = await this.firebaseService.getAuth().createUser({
          email: createAuthDto.email,
          password: createAuthDto.password,
        });
        const filepath = await this.storage.uploadImage(
          `/users/${user.uid}`,
          file,
        );
        const userProfile: CreateUser = {
          uid: user.uid,
          email: createAuthDto.email,
          firstName: createAuthDto.firstName,
          lastName: createAuthDto.lastName,
          photoURL: filepath,
        };
        const recordUser = await this.userService.create(userProfile);
        return {
          userId: user.uid,
          token: this.getTokenForUser(userProfile),
        };
      } catch (err) {
        throw err;
      }
    }
  }

  async signIn(createAuthDto: LoginDto) {
    const user = await this.firebaseService.signInWithEmailAndPassword(
      createAuthDto,
    );
    const userRecord = await this.userService.findOneById(user.uid);
    const userProfile: CreateUser = {
      uid: user.uid,
      email: user.email,
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
    };
    return {
      userId: user.uid,
      token: this.getTokenForUser(userProfile),
    };
  }
  async signInByGoogle(createAuthDto: LoginByGoogleDto) {
    try {
      const isValid = await this.firebaseService.verifyToken(
        createAuthDto.token,
      );
      const exUser = await this.userService.findOneById(createAuthDto.userId);
      if (!exUser) {
        const user: UserRecord = await this.firebaseService
          .getAuth()
          .getUser(createAuthDto.userId);
        const userProfile: CreateUser = {
          uid: user.uid,
          email: createAuthDto.email,
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1],
        };
        const recordUser = await this.userService.create(userProfile);
      }

      if (isValid) {
        return {
          userId: createAuthDto.userId,
          token: this.getTokenForUser({
            email: createAuthDto.email,
            uid: createAuthDto.userId,
          }),
        };
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {}
  }
}
