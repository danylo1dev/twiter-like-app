import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateLike } from './create-like.type';

export class UpdateLike extends PartialType(OmitType(CreateLike, ['postId'])) {}
