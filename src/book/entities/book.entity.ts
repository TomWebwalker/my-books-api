import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
