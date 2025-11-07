// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint: POST /auth/register
  @Post('register')
  async register(@Body() body: any) {
    const { email, name, password } = body;
    if (!email || !name||!password) {
        return { message: 'Email, Name dan password harus diisi.' };
    }
    const user = await this.authService.register(email, name, password);
    const { password: userPass, ...result } = user;
    return result;
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    
    if (!user) {
      return { statusCode: 401, message: 'Kredensial tidak valid' };
    }
    
    return this.authService.login(user);
  }
}