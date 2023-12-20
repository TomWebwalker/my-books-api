import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Author {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
