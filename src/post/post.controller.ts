// src/post/post.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
  interface JwtPayload {
    id: number; // ID pengguna
    username: string;
    // ... properti lain
}

interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}


  // CRUD
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest, // <--- Inject objek request
  ): Promise<PostEntity> {
    // Asumsi: ID pengguna ada di req.user.id
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
