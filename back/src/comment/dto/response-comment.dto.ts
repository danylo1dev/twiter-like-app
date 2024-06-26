import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommentDto {
  @ApiProperty({
    type: String,
  })
  'postId': string;
  @ApiProperty({
    type: String,
  })
  'text': string;
  @ApiProperty({
    type: String,
  })
  'userId': string;
  @ApiProperty({
    type: String,
  })
  'username': string;
}
