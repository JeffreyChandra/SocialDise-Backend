// src/post/post.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  // Kolom Baru untuk Media (Gambar/Video URL)
  @Column({ nullable: true }) // Izinkan postingan tanpa media
  mediaUrl: string; 

  // Kolom Baru untuk Jumlah Like
  @Column({ default: 0 }) 
  likesCount: number;

  // Relasi: Satu Post memiliki Banyak Comment
  @OneToMany(() => Comment, comment => comment.post, { 
    cascade: true, 
  })
  comments: Comment[];
}