// src/post/post.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Comment } from '../comment/comment.entity';
// Import User Entity Anda
// import { User } from '../user/user.entity'; 

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  mediaUrl: string; 

  @Column({ default: 0 })
  likesCount: number;
  
  // KOLOM BARU UNTUK USER ID
  @Column()
  userId: number; // ID Pengguna yang membuat postingan
  
  /*
  // RELASI KE USER (Hapus komentar jika User Entity Anda ada dan diimpor)
  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;
  */

  @OneToMany(() => Comment, comment => comment.post, { 
    cascade: true, 
  })
  comments: Comment[];
}