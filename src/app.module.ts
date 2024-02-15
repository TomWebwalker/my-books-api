import { Module } from '@nestjs/common';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/book.entity';
import { User } from './users/entities/user.entity';
import { AuthorsModule } from './authors/authors.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Author, Book, User],
      autoLoadEntities: true,
    }),
    AuthorsModule,
    UsersModule,
    AuthModule,
    BooksModule,
  ],
})
export class AppModule {}
