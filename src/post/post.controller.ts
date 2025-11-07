// src/post/post.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe, Req, UseGuards, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express'; 
import { IsNumber, IsNotEmpty, Min } from 'class-validator'; // Digunakan untuk DTO baru
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

// --- DTO BARU UNTUK PENCARIAN BERDASARKAN BODY ---
export class UserIdDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    userId: number;
}
// --------------------------------------------------

// Asumsi Payload JWT
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

  // CRUD CREATE (Tetap menggunakan token untuk userId)
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
  // PERUBAHAN: MENCARI POST BERDASARKAN USER ID MENGGUNAKAN BODY (Metode POST)
  // =========================================================
  // Endpoint: POST /posts/by-user
  @Post('by-user') // <-- Diubah dari GET menjadi POST
  async findPostsByUserId(@Body() userIdDto: UserIdDto): Promise<PostEntity[]> {
    // Mengambil userId dari body DTO
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