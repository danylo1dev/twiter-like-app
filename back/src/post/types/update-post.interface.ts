import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePost } from './create-post.interface';

export class UpdatePost extends PartialType(OmitType(CreatePost, ['userId'])) {}
