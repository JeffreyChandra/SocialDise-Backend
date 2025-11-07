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

  // **C - Create**
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(newPost);
  }

  // **R - Read All**
  findAll(): Promise<Post[]> {
    // Relasi 'comments' akan dimuat bersama postingan
    return this.postsRepository.find({ 
        relations: ['comments'] 
    }); 
  }
  async addLike(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    
    if (!post) {
      throw new NotFoundException(`Postingan dengan ID ${id} tidak ditemukan.`);
    }

    // Tambahkan 1 ke likesCount
    post.likesCount += 1;
    
    // Simpan perubahan ke database
    return this.postsRepository.save(post);
}

  // **R - Read One**
  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ 
        where: { id },
        relations: ['comments'], // Muat komentar juga
    });
    
    if (!post) {
      throw new NotFoundException(`Postingan dengan ID ${id} tidak ditemukan.`);
    }
    return post;
  }

  // **U - Update**
  async update(id: number, updateData: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id); // Memastikan post ada
    
    // TypeORM update/save
    Object.assign(post, updateData); 
    
    return this.postsRepository.save(post);
  }

  // **D - Delete**
  async remove(id: number): Promise<{ deleted: true; id: number }> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Postingan dengan ID ${id} tidak ditemukan.`);
    }
    // Karena kita menggunakan cascade: true di Post.entity.ts, 
    // semua komentar yang terkait akan otomatis terhapus (PostgreSQL/TypeORM yang menangani).
    return { deleted: true, id };
  }

  
}