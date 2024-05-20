import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreatePost } from '../types/create-post.interface';

export class CreatePostDto extends OmitType(CreatePost, ['userId']) {
  @ApiProperty({
    example:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam eius sed et ut dolores, distinctio sit molestiae voluptas error? Ea ipsa quo nisi nesciunt doloribus, temporibus enim dolor excepturi, eos porro accusantium non id modi',
    type: String,
  })
  @IsString()
  @MaxLength(500)
  @MinLength(50)
  @IsNotEmpty()
  text: string;
}
