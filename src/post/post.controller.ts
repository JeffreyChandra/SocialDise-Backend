// src/post/post.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express'; 

// Import AuthGuard Anda (Pastikan path ke file jwt-auth.guard.ts Anda benar)
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

// Asumsi Payload JWT Anda
interface JwtPayload {
  id: number; // ID pengguna
  username: string;
}

interface AuthenticatedRequest extends Request {
    user: JwtPayload; // <-- 'user' TIDAK lagi opsional karena GUARD diaktifkan
}

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // CRUD
  
  // AKTIVASI GUARD: Mencegah akses jika tidak ada token valid
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest, 
  ): Promise<PostEntity> {
    
    // LOGIKA AMAN: ID pengguna (misalnya 7) DIJAMIN ada karena sudah diverifikasi oleh JwtAuthGuard
    const userId = req.user.id; 
    
    return this.postService.create(createPostDto, userId);
  }
  
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }
  
  // ... endpoint lain dipertahankan ...

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateData: UpdatePostDto
  ): Promise<PostEntity> {
    return this.postService.update(id, updateData);
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postService.remove(id);
  }
  
  // FITUR LIKE (Biasanya tidak perlu otorisasi, tapi jika perlu, tambahkan @UseGuards)
  @Post(':id/like')
  async likePost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.addLike(id);
  }
}