// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import * as fs from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const caCertPath = configService.get<string>('POSTGRES_SSL_CA_PATH');
        const ca = caCertPath ? fs.readFileSync(caCertPath).toString() : undefined;

        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'], 
          synchronize: true, // Hati-hati di production!
          
          ssl: ca ? {
            rejectUnauthorized: true, 
            ca: ca, 
          } : false,
        };
      },
      inject: [ConfigService],
    }),
    
    PostModule,     // Modul Postingan
    CommentModule,  // Modul Komentar
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}