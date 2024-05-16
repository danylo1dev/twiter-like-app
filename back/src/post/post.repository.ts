import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { mapArrayFromSnaphot } from 'src/shared/mapSnapshot';
import { CreatePost } from './types/create-post.interface';
import { findOptions } from './types/find-options.type';
import { UpdatePost } from './types/update-post.interface';
import { whereParser } from 'src/shared/whereParser';
import { Query } from 'firebase-admin/database';

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
  async create(post: CreatePost) {
    const newPost = await this.postStore.add(post);
    return newPost.path.split('/')[1];
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
    console.log('test');
    let query: FirebaseFirestore.Query = this.postStore;
    if (Object.keys(options?.where).length > 0) {
      query = whereParser(options.where, this.postStore);
    }

    const snapshot = await query
      .orderBy('userId')
      .limit(options?.pagination.limit || 10)
      .startAt(options?.pagination.page || 10)
      .get();
    if (snapshot.empty) {
      return [];
    }
    const result = mapArrayFromSnaphot(snapshot);
    return result;
  }
  async update(id: string, post: UpdatePost) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.postStore.doc(id).update(post);
  }
  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.postStore.doc(id).delete();
  }
}
