// src/post/dto/create-post.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional() // Opsional, karena tidak semua post punya media
  @IsUrl() // Memastikan input berbentuk URL yang valid
  mediaUrl?: string; // Tipe string untuk URL media
}
// DTO update-post.dto.ts akan mewarisi ini, jadi tidak perlu diubah