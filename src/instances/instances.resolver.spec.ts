import { Test, TestingModule } from '@nestjs/testing';
import { InstancesResolver } from './instances.resolver';
import { InstancesService } from './instances.service';

describe('InstancesResolver', () => {
  let resolver: InstancesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstancesResolver, InstancesService],
    }).compile();

    resolver = module.get<InstancesResolver>(InstancesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
