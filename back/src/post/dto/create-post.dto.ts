import { ApiProperty } from '@nestjs/swagger';
import { CreatePost } from '../types/create-post.interface';

export class CreatePostDto implements CreatePost {
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
  @ApiProperty({
    example: 'uid123adc',
    type: String,
  })
  userId: string;
}
