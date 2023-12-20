import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String, { description: 'Name of the book' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Description of the author' })
  @Column()
  description: string;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
