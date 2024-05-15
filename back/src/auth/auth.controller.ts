import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResponseAuthDto } from './dto/response.dto';
import { AuthJwtGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  @ApiResponse({
    status: 200,
    description: 'Registrated',
    type: ResponseAuthDto,
  })
  register(@Body() registerDto: RegisterDto): Promise<ResponseAuthDto> {
    return this.authService.createUser(registerDto);
  }
  @Post('/login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Authorized',
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto);
  }
  @Get('/me')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Profile',
  })
  @UseGuards(AuthJwtGuard)
  async me(@CurrentUser() user) {
    return user;
  }
}
