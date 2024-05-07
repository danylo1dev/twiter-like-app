import { FirebaseOptions } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { Module, DynamicModule } from '@nestjs/common';

@Module({
  providers: [FirebaseService],
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
