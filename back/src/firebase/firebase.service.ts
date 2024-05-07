import { Inject, Injectable } from '@nestjs/common';
import { FirebaseOptions, initializeApp } from 'firebase/app';

@Injectable()
export class FirebaseService {
  private readonly app;
  constructor(@Inject('CONFIG_OPTIONS') firebaseConfig: FirebaseOptions) {
    this.app = initializeApp(firebaseConfig);
  }
  getApp() {
    return this.app;
  }
}
