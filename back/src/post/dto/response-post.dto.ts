import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class ResponsePostDto extends CreatePostDto {
  @ApiProperty({
    type: String,
  })
  userId: string;
  @ApiProperty({
    type: String,
  })
  username: string;
  @ApiProperty({
    type: String,
  })
  postId: string;
  @ApiProperty({
    type: Number,
  })
  likeCount: number;
}
