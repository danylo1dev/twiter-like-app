import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseAuthDto } from './dto/response.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthLocalGuard } from './guards/local-auth.guard';

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
}
