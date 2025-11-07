// src/post/post.service.ts (KODE YANG BENAR DAN TERSTRUKTUR)

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  // Pastikan constructor berada di awal kelas
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  // **C - Create**
  // Menerima userId dari token (prioritas) dan DTO (untuk data postingan)
  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const newPost = this.postsRepository.create({
        ...createPostDto,
        // Gunakan userId yang didapat dari token/controller (prioritas utama)
        userId: userId, 
    });
    return this.postsRepository.save(newPost);
  }

  // **R - Read All (Semua Post)**
  // Metode findAll tanpa parameter filter
  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ 
        // Muat relasi 'user' dan 'comments'
        relations: ['user', 'comments'],
        order: { id: 'DESC' }, // Opsional: tampilkan yang terbaru duluan
    }); 
  }

  // **R - Read All By User (BARU)**
  // Metode yang dipanggil oleh /posts/by-user?userId=X
  async findAllByUserId(userId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { userId: userId },
      relations: ['user', 'comments'],
      order: { id: 'DESC' },
    });
  }

  // **R - Read One**
  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ 
        where: { id },
        relations: ['user', 'comments'], 
    });
    
    if (!post) {
      throw new NotFoundException(`Postingan dengan ID ${id} tidak ditemukan.`);
    }
    
    // Opsional: Hapus password user dari objek yang akan dikembalikan
    if (post.user && 'password' in post.user) {
        delete (post.user as any).password;
    }
    
    return post;
  }

  // **U - Update**
  async update(id: number, updateData: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updateData); 
    return this.postsRepository.save(post);
  }

  // **D - Delete**
  async remove(id: number): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Postingan ID ${id} tidak ditemukan.`);
    }
  }
  
  // FITUR LIKE
  async addLike(id: number): Promise<Post> {
    await this.postsRepository.increment({ id }, 'likesCount', 1);
    return this.findOne(id);
  }
}