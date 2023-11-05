import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInstanceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
