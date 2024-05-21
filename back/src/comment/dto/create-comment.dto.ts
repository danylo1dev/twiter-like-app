import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateComment } from '../types/create-comment';
import { IsString, MaxLength } from 'class-validator';

export class CreateCommentDto extends OmitType(CreateComment, [
  'userId',
  'username',
]) {
  @ApiProperty({
    example: 'Dude, this is coool post',
    type: String,
  })
  @IsString()
  @MaxLength(500)
  text: string;
  @ApiProperty({
    example: 'Id of the post',
    type: String,
  })
  @IsString()
  postId: string;
}
