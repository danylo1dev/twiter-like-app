import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommentDto {
  @ApiProperty({
    example: true,
    type: String,
  })
  text: string;
}
