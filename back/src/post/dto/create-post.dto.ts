import { ApiProperty } from '@nestjs/swagger';
import { CreatePost } from '../types/create-post.interface';
import { OmitType } from '@nestjs/mapped-types';

export class CreatePostDto extends OmitType(CreatePost, ['userId']) {
  @ApiProperty({
    example: 'Post title',
    type: String,
  })
  title: string;
  @ApiProperty({
    example: 'Post text',
    type: String,
  })
  text: string;
  // @ApiProperty({
  //   example: 'uid123adc',
  //   type: String,
  // })
  // userId: string;
}
