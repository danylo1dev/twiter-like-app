// {
//   isAuth: truestring;
//   user: {
//     user, userProfile;
//   }
// }

import { ApiProperty } from '@nestjs/swagger';
class UserProfile {
  @ApiProperty({
    example: true,
    type: String,
  })
  uid: string;
  @ApiProperty({
    example: true,
    type: String,
  })
  email: string;
  @ApiProperty({
    example: true,
    type: String,
  })
  firstName: string;
  @ApiProperty({
    example: true,
    type: String,
  })
  lastName: string;
}

export class ResponseAuthDto {
  @ApiProperty({
    description: 'Is User authorized',
    example: true,
    type: Boolean,
  })
  isAuth: boolean;
  @ApiProperty({
    example: true,
    type: UserProfile,
  })
  user: UserProfile;
}
