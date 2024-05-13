import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthDto {
  @ApiProperty({
    description: 'JWT token for this User',
    example: 'dasdasdjasdjjlalds;ka',
    type: String,
  })
  token: string;
  @ApiProperty({
    example: true,
    type: String,
  })
  userId: string;
}
