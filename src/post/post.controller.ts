// src/post/post.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe, Req, UseGuards, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

// ... interface JwtPayload dan AuthenticatedRequest ...
interface JwtPayload {
  sub: number;
  username?: string;
  // add other token fields if needed
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    [key: string]: any;
  };
}

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // CRUD
  
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest, 
  ): Promise<PostEntity> {
    const userId = req.user.id; 
    return this.postService.create(createPostDto, userId);
  }
  
  @Get()
  async findAll(@Req() req: AuthenticatedRequest): Promise<PostEntity[]> {
    const userId = req.user.id;
    return this.postService.findAllByUserId(userId);
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }
  
// =========================================================
// PERBAIKAN: ENDPOINT BARU UNTUK MENCARI POST BERDASARKAN USER ID
// =========================================================
  // Endpoint: GET /posts/by-user?userId=7
  @Get('by-user')
  async findPostsByUserId(@Query('userId', ParseIntPipe) userId: number): Promise<PostEntity[]> {
    // Memanggil metode Service yang benar yang sudah kita definisikan sebelumnya
    return this.postService.findAllByUserId(userId); 
  }
// =========================================================

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
  
  @Post(':id/like')
  async likePost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.addLike(id);
  }
}