import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String, { description: 'First name of the author' })
  @Column()
  firstName: string;

  @Field(() => String, { description: 'Last name of the author' })
  @Column()
  lastName: string;
}
