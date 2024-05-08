import { Injectable } from '@nestjs/common';
import { Auth } from 'firebase-admin/auth';
import { FirebaseService } from 'src/firebase/firebase.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private firebaseAuth: Auth;
  constructor(private readonly firebaseService: FirebaseService) {}
  async createUser(createAuthDto: RegisterDto) {
    return await this.firebaseService.createUserWithEmailAndPassword(
      createAuthDto,
    );
  }

  async signIn(createAuthDto: RegisterDto) {
    return await this.firebaseService.createUserWithEmailAndPassword(
      createAuthDto,
    );
  }
}
