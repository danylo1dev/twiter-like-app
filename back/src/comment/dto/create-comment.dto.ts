import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateComment } from '../types/create-comment';

export class CreateCommentDto extends OmitType(CreateComment, ['userId']) {
  @ApiProperty({
    example: 'Dude, this is coool post',
    type: String,
  })
  text: string;
  @ApiProperty({
    example: 'Id of the post',
    type: String,
  })
  postId: string;
}
