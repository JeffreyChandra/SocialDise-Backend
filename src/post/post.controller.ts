// src/post/post.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe, Req, UseGuards, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express'; 
import { IsNumber, IsNotEmpty, Min } from 'class-validator'; // <-- Diperlukan untuk DTO baru
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

// --- DTO BARU UNTUK PENCARIAN BERDASARKAN BODY ---
export class UserIdDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    userId: number; // <-- Diharapkan tipe number dari body JSON
}
// --------------------------------------------------

// Asumsi Payload JWT dan Request
interface JwtPayload {
  sub: number;
  id: number; 
  username?: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // CRUD CREATE (Membutuhkan Otorisasi)
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest, 
  ): Promise<PostEntity> {
    const userId = req.user.id; 
    return this.postService.create(createPostDto, userId);
  }
  
  // R: READ (Semua Post)
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  // R: READ (Berdasarkan Post ID)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }
  
  // =========================================================
  // FUNGSI FIND BY USER ID (MENGGUNAKAN BODY DTO)
  // =========================================================
  // Endpoint: POST /posts/by-user
  @Post('by-user') // <-- Gunakan POST untuk menerima BODY JSON
  async findPostsByUserId(@Body() userIdDto: UserIdDto): Promise<PostEntity[]> {
    // userIdDto.userId DIJAMIN bertipe number oleh ValidationPipe
    return this.postService.findAllByUserId(userIdDto.userId); 
  }
  // =========================================================
    
  // U & D (UPDATE & DELETE)
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