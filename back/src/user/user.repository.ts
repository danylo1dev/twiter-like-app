import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUser } from './create-user.interface';
import { UpdateUser } from './update-user.interface';

@Injectable()
export class UserRepository {
  firestore: Firestore;
  userStore: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;
  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.getFirestore();
    this.userStore = this.firestore.collection('users');
  }
  async create(user: CreateUser) {
    return await this.userStore.doc(user.uid).set(user);
  }
  async getOneById(uid: string) {
    const doc = await this.userStore.doc(uid).get();
    if (doc.exists) {
      return doc.data();
    }
  }
  async getOneByEmail(email: string) {
    const doc = await this.userStore.get();
    if (doc.empty) {
      return [];
    }
    const result = [];
    doc.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  }
  async getMany() {
    const snapshot = await this.userStore.limit(10).get();
    if (snapshot.empty) {
      return [];
    }
    const result = [];
    snapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  }
  async update(uid: string, user: UpdateUser) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.userStore.doc(uid).update(user);
  }
}
