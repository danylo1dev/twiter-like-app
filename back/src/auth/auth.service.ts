import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'firebase-admin/auth';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUser } from 'src/user/create-user.interface';

@Injectable()
export class AuthService {
  private firebaseAuth: Auth;
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  public getTokenForUser(user: any): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.uid,
    });
  }
  async createUser(createAuthDto: RegisterDto) {
    try {
      const exUser = await this.firebaseService
        .getAuth()
        .getUserByEmail(createAuthDto.email);
      console.log(exUser);
      if (exUser) {
        throw new ForbiddenException(
          `User with ${createAuthDto.email} alredy exist`,
        );
      }
      const user = await this.firebaseService.getAuth().createUser({
        email: createAuthDto.email,
        password: createAuthDto.password,
      });
      const userProfile: CreateUser = {
        uid: user.uid,
        email: createAuthDto.email,
        firstName: createAuthDto.firstName,
        lastName: createAuthDto.lastName,
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
    return userProfile;
  }
}
