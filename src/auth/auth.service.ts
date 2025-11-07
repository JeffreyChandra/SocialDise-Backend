// src/auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity'; // Sesuaikan path

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // --- REGISTRASI ---
  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar.');
    }
    
    // User.entity.ts memiliki @BeforeInsert untuk hashing password
    const newUser = this.usersRepository.create({ email, password });
    return this.usersRepository.save(newUser);
  }

  // --- LOGIN: Validasi Kredensial ---
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Hilangkan password dari hasil yang dikembalikan
      const { password, ...result } = user;
      return result; 
    }
    return null;
  }

  // --- LOGIN: Membuat JWT ---
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}