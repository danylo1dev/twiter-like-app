import { Injectable } from '@nestjs/common';
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UpdatePost } from 'src/post/types/update-post.interface';
import { mapArrayFromSnaphot } from 'src/shared/mapSnapshot';
import { whereParser } from 'src/shared/whereParser';
import { CreateComment } from './types/create-comment';
import { CommentFindOptions } from './types/find-comment-options.type';

@Injectable()
export class CommentRepository {
  firestore: Firestore;
  commentStore: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;
  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.getFirestore();
    this.commentStore = this.firestore.collection('comments');
  }
  async create(comment: CreateComment) {
    try {
      const newComment = await this.commentStore.add({
        ...comment,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      return newComment.path.split('/')[1];
    } catch (err) {
      throw err;
    }
  }
  async getOne(id: string) {
    const doc = await this.commentStore.doc(id).get();
    if (doc.exists) {
      return doc.data();
    }
  }
  async getMany(options?: CommentFindOptions) {
    let query: FirebaseFirestore.Query = this.commentStore;
    if (options) {
      if (Object.keys(options?.where).length > 0) {
        query = whereParser(options.where, this.commentStore);
      }
    }

    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .limit(options?.pagination?.limit || 10)
      .endAt(options?.pagination?.page * options?.pagination?.limit || 10)
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
    return await this.commentStore.doc(id).update(post);
  }
  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return await this.commentStore.doc(id).delete();
  }
}
