import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../books/entities/book.entity';

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
  books?: Book[];

  @ApiProperty()
  totalBooks: number;
}
