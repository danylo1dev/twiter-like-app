import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from '../auth.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super();
  }
  async validate(email: string, password: string): Promise<any> {
    console.log(email);
    // const { user } = await this.firebaseService.signInWithEmailAndPassword({
    //   email,
    //   password,
    // });
    const user = await this.authService.signIn({ email, password });
    if (!user) {
      this.logger.debug(`Invalid credentionals for user`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
