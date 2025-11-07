// src/post/post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const newPost = this.postsRepository.create({
        ...createPostDto,
        userId: userId,
    });
    return this.postsRepository.save(newPost);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['comments'] }); 
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ 
        where: { id },
        relations: ['comments'],
    });
    if (!post) {
      throw new NotFoundException(`Postingan ID ${id} tidak ditemukan.`);
    }
    return post;
  }

  async update(id: number, updateData: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updateData); 
    return this.postsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Postingan ID ${id} tidak ditemukan.`);
    }
  }
  
  // FITUR LIKE
  async addLike(id: number): Promise<Post> {
    // Alternatif efisien: gunakan increment, lalu ambil data baru
    await this.postsRepository.increment({ id }, 'likesCount', 1);
    return this.findOne(id);
  }
}

// src/post/post.service.ts (Modifikasi Metode Create)

// ... import dan constructor ...

  // **C - Create**
  // Menerima userId dari token yang diverifikasi
  

// ... metode findAll, findOne, update, remove, addLike ...