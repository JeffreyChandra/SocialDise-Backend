// src/auth/auth.service.ts (Diperbaiki)

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // --- REGISTRASI ---
  async register(email: string, name: string, password: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar.');
    }
    
    const newUser = this.usersRepository.create({ email, name, password });
    return this.usersRepository.save(newUser);
  }

  // --- LOGIN: Validasi Kredensial ---
  async validateUser(email: string, pass: string): Promise<User | null> {
    // Pastikan user di-load dengan password agar bcrypt.compare bisa bekerja
    const user = await this.usersRepository.findOne({ 
        where: { email },
        select: ['id', 'email', 'name', 'password', 'followers', 'following'],
    });
    
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user; // Mengembalikan objek user lengkap (termasuk password)
    }
    return null;
  }

  // --- LOGIN: Membuat JWT dan Mengembalikan Data User ---
  // Mengembalikan { user data tanpa password, accessToken }
  async login(user: User): Promise<{ user: Partial<User>; accessToken: string }> {
    // 1. Buat payload JWT
    const payload = { email: user.email, sub: user.id, id: user.id }; // Tambahkan 'id' untuk payload
    
    // 2. Buat token
    const accessToken = this.jwtService.sign(payload);
    
    // 3. Bersihkan objek user (hapus password sebelum dikirim)
    const { password, ...result } = user;
    
    // 4. Kembalikan data yang dibutuhkan frontend
    return {
      user: result,
      accessToken: accessToken,
    };
  }
}