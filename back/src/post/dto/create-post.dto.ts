import { ApiProperty } from '@nestjs/swagger';
import { CreatePost } from '../types/create-post.interface';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength, maxLength } from 'class-validator';

export class CreatePostDto extends OmitType(CreatePost, ['userId']) {
  @ApiProperty({
    example: 'Post text',
    type: String,
  })
  @IsString()
  @MaxLength(145)
  @IsNotEmpty()
  text: string;
}
