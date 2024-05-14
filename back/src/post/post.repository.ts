import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { mapArrayFromSnaphot } from 'src/shared/mapSnapshot';
import { CreatePost } from './types/create-post.interface';
import { findOptions } from './types/find-options.type';
import { UpdatePost } from './types/update-post.interface';

@Injectable()
export class PostRepository {
  firestore: Firestore;
  postStore: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;
  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.getFirestore();
    this.postStore = this.firestore.collection('posts');
  }
  async create(user: CreatePost) {
    return await this.postStore.add(user);
  }
  async getOne(id: string) {
    const doc = await this.postStore.doc(id).get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      return doc.data();
    }
  }
  async getMany(options?: findOptions) {
    // let query: Query = this.postStore;
    // if (options?.where) {
    //   query = whereParser(options?.where, this.postStore);
    // }
    console.log('test');
    const snapshot = await this.postStore
      .orderBy('userId')
      .limit(options?.pagination.limit || 10)
      .startAt(options?.pagination.page || 10)

      .get();
    // const snapshot = await query.get();
    if (snapshot.empty) {
      return [];
    }
    const result = mapArrayFromSnaphot(snapshot);
    return result;
  }
  async update(id: string, user: UpdatePost) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.postStore.doc(id).update(user);
  }
  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.postStore.doc(id).delete();
  }
}
