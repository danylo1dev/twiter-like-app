export enum LikeGrade {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}
export class CreateLike {
  postId: string;
  grate: LikeGrade;
}