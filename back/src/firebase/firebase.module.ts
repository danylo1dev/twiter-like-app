import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseOptions } from 'firebase/app';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {
  static forRoot(options: FirebaseOptions): DynamicModule {
    return {
      module: FirebaseModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        FirebaseService,
      ],
    };
  }
}
