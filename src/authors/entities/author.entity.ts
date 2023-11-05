import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Instance } from '../../instances/entities/instance.entity';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uuid: string;

  @Column('int')
  instanceId: number;

  @Field(() => String, { description: 'First name of the author' })
  @Column()
  firstName: string;

  @Field(() => String, { description: 'Last name of the author' })
  @Column()
  lastName: string;

  @ManyToOne(() => Instance, (instance) => instance.author, {
    onDelete: 'CASCADE',
  })
  instance: Instance;
}
