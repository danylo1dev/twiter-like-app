import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'email@email.com',
    type: String,
  })
  @IsEmail()
  @IsString()
  email: string;
  @ApiProperty({
    example: 'Danylo',
    type: String,
  })
  @IsString()
  @MaxLength(32)
  firstName: string;
  @ApiProperty({
    example: 'Hlushko',
    type: String,
  })
  @IsString()
  @MaxLength(32)
  lastName: string;
  @ApiProperty({
    example: 'SuperSecretPassword123123',
    type: String,
  })
  @IsString()
  @MinLength(4)
  password: string;
}
