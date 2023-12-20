import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { BookModule } from './book/book.module';
import { Book } from './book/entities/book.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthorsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Author, Book],
      migrations: ['dist/migrations/*.js'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BookModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
