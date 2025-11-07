// src/post/post.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity'; // Rename untuk menghindari konflik nama
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts') // Endpoint dasar: /posts
export class PostController {
  constructor(private readonly postService: PostService) {}

  // POST /posts
  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  // GET /posts
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  // GET /posts/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  // PUT /posts/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateData: UpdatePostDto
  ): Promise<PostEntity> {
    return this.postService.update(id, updateData);
  }

  // DELETE /posts/:id
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