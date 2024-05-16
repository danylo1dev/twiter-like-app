import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateComment } from './types/create-comment';
import { UpdateComment } from './types/update-comment';
import { mapArrayFromSnaphot } from 'src/shared/mapSnapshot';
import { UpdatePost } from 'src/post/types/update-post.interface';
import {
  CommentWhere,
  CommentFindOptions,
} from './types/find-comment-options.type';
import { whereParser } from 'src/shared/whereParser';

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
      console.log('test');
      const newComment = await this.commentStore.add(comment);
      console.log('test');
      console.log(newComment);
      return newComment.path.split('/')[1];
    } catch (err) {
      console.log(err);
    }
  }
  async getOne(id: string) {
    const doc = await this.commentStore.doc(id).get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      return doc.data();
    }
  }
  async getMany(options?: CommentFindOptions) {
    console.log('test');
    let query: FirebaseFirestore.Query = this.commentStore;
    if (options) {
      if (Object.keys(options?.where).length > 0) {
        query = whereParser(options.where, this.commentStore);
      }
    }

    const snapshot = await query
      .orderBy('postId')
      .limit(options?.pagination?.limit || 10)
      .startAt(options?.pagination?.page || 1)
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
