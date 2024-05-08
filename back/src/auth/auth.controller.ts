import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.createUser(registerDto);
  }
  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.createUser(loginDto);
  }
}
