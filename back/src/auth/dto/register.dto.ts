import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'email@email.com',
    type: String,
  })
  email: string;
  @ApiProperty({
    example: 'Danylo',
    type: String,
  })
  firstName: string;
  @ApiProperty({
    example: 'Hlushko',
    type: String,
  })
  lastName: string;
  @ApiProperty({
    example: 'SuperSecretPassword123123',
    type: String,
  })
  password: string;
}
