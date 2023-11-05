import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@ObjectType()
@Entity()
export class Instance {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String, { description: 'Unique token for instance' })
  @Column()
  token: string;

  @Field(() => String, { description: 'Date of creation' })
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Field(() => String, { description: 'Date of removal' })
  @Column('timestamp')
  dueDateAt: string;

  @OneToMany(() => Author, (author) => author.instance)
  author: Author[];
}
