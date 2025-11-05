// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as fs from 'fs';

@Module({
  imports: [
    // 1. Konfigurasi Variabel Lingkungan
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    // 2. Konfigurasi TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Baca Sertifikat CA
        const caCertPath = configService.get<string>('POSTGRES_SSL_CA_PATH');
        const ca = caCertPath ? fs.readFileSync(caCertPath).toString() : undefined;

        // Opsi Koneksi
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'], 
          synchronize: true,
          
          // PENTING: Pengaturan SSL untuk Aiven
          ssl: ca ? {
            rejectUnauthorized: true, 
            ca: ca, 
          } : false,
        };
      },
      inject: [ConfigService],
    }),
    
    AuthModule,
    // ... modul lain
  ],
  // ...
})
export class AppModule {}