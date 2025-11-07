// src/post/post.controller.ts (Perbaikan Crash Tanpa AuthGuard)

import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express'; // Pastikan Request diimpor dari 'express'

// Asumsi Payload JWT Anda
interface JwtPayload {
  id: number; // ID pengguna
  username: string;
}

interface AuthenticatedRequest extends Request {
    user?: JwtPayload; // <-- Ganti menjadi opsional (?) karena AuthGuard tidak digunakan
}

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}


  // CRUD
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest, 
  ): Promise<PostEntity> {
    
    // PERBAIKAN: Gunakan optional chaining (?.) atau operator ||
    // Jika req.user ada, ambil id-nya. Jika tidak, gunakan ID default (misal: 1).
    const userId = req.user?.id || 1; // <--- BARIS KRUSIAL DIPERBAIKI
    
    // Peringatan: Gunakan ID 1 hanya jika Anda yakin User dengan ID 1 ada di database.
    
    return this.postService.create(createPostDto, userId);
  }
  
  // ... metode findAll, findOne, update, delete, likePost (tidak ada perubahan) ...

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }
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
  
  // FITUR LIKE
  @Post(':id/like')
  async likePost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.addLike(id);
  }
}