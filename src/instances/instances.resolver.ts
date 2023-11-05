import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InstancesService } from './instances.service';
import { Instance } from './entities/instance.entity';

@Resolver(() => Instance)
export class InstancesResolver {
  constructor(private readonly instancesService: InstancesService) {}

  @Mutation(() => Instance)
  createInstance() {
    return this.instancesService.create();
  }

  @Query(() => Instance, { name: 'instance' })
  findByToken(@Args('token', { type: () => String }) token: string) {
    return this.instancesService.findByToken(token);
  }

  @Mutation(() => Instance)
  removeInstance(@Args('id', { type: () => Int }) id: number) {
    return this.instancesService.remove(id);
  }

  @Mutation(() => Boolean)
  removeOutdated() {
    return this.instancesService.removeOutdated();
  }
}
