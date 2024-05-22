import { Injectable } from '@nestjs/common';
import {
  CollectionReference,
  Firestore,
  Timestamp,
} from 'firebase-admin/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { mapArrayFromSnaphot } from 'src/shared/mapSnapshot';
import { whereParser } from 'src/shared/whereParser';
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
  async create(post: CreatePost) {
    const newPost = await this.postStore.add({
      ...post,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
    return newPost.path.split('/')[1];
  }
  async getOne(id: string) {
    const doc = await this.postStore.doc(id).get();
    if (doc.exists) {
      return doc.data();
    }
  }
  async getMany(options?: findOptions) {
    try {
      let query: FirebaseFirestore.Query | CollectionReference = this.postStore;
      if (options) {
        if (Object.keys(options?.where).length > 0) {
          query = whereParser(options.where, this.postStore);
        }
      }
      const snapshot = await query
        .where('text', '==', '%Ullam12%')
        .orderBy('createdAt', 'desc')
        .limit(options?.pagination?.limit || 10)
        .endAt(options?.pagination?.page * options?.pagination?.limit || 10)
        .get();
      if (snapshot.empty) {
        return [];
      }
      const result = mapArrayFromSnaphot(snapshot);
      return result;
    } catch (err) {
      throw err;
    }
  }
  async update(id: string, post: UpdatePost) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.postStore.doc(id).update({
      ...post,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  }
  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.postStore.doc(id).delete();
  }
}
