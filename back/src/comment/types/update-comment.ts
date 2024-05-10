import { PartialType } from '@nestjs/mapped-types';
import { CreateComment } from './create-comment';

export class UpdateComment extends PartialType(CreateComment) {}
