import { Module } from '@nestjs/common';
import { InstancesService } from './instances.service';
import { InstancesResolver } from './instances.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instance } from './entities/instance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instance])],
  providers: [InstancesResolver, InstancesService],
})
export class InstancesModule {}
