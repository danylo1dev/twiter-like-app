import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { storage } from 'firebase-admin/lib/storage/storage-namespace';

@Injectable()
export class StoreService {
  constructor(private readonly firebaseService: FirebaseService) {}
  async uploadImage(destination: string, image: Buffer) {
    try {
      const file = this.firebaseService.getStorage().bucket().file(destination);
      await file.save(image, { contentType: 'image/png' });
      return file.publicUrl();
    } catch (err) {
      throw err;
    }
    const file = this.firebaseService
      .getStorage()
      .bucket('fotos')
      .file(destination);
    await file.save(image, { contentType: 'image/png' });
    return file.publicUrl();
  }
}
