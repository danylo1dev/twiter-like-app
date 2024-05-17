import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { mapArrayFromSnaphot } from 'src/shared/mapSnapshot';
import { CreateLike } from './types/create-like.type';
import { UpdateLike } from './types/update-like.type';

@Injectable()
export class LikeRepository {
  firestore: Firestore;
  commentStore: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;
  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.getFirestore();
    this.commentStore = this.firestore.collection('comments');
  }
  async create(comment: CreateLike) {
    return await this.commentStore.add(comment);
  }
  async getOne(id: string) {
    const doc = await this.commentStore.doc(id).get();
    if (!doc.exists) {
      return null;
    } else {
      return doc.data();
    }
  }
  async getLikeForPost(postId): Promise<any[]> {
    const snapshot = await this.commentStore
      .where('postId', '==', postId)
      .limit(10)
      .startAt(1)
      .get();
    if (snapshot.empty) {
      return [];
    }
    const result = mapArrayFromSnaphot(snapshot);
    return result;
  }
  async update(id: string, like: UpdateLike) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.commentStore.doc(id).update(like);
  }
  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.commentStore.doc(id).delete();
  }
}
