import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Instance } from './entities/instance.entity';
import { makeId } from '../utils/make-id';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstancesService {
  constructor(
    @InjectRepository(Instance)
    private instanceRepository: Repository<Instance>,
  ) {}

  create() {
    const token = makeId(20);
    const dueDateAt = new Date();
    dueDateAt.setDate(dueDateAt.getDate() + 7);
    return this.instanceRepository.save({
      token,
      dueDateAt: dueDateAt.toISOString(),
    });
  }

  findAll() {
    return [];
  }

  findByToken(token: string) {
    return this.instanceRepository.findOne({ where: { token } });
  }

  remove(id: number) {
    return `This action removes a #${id} instance`;
  }

  async removeOutdated() {
    const now = new Date().toISOString().replace('T', ' ').replace('Z', '');
    const result = await this.instanceRepository.delete({
      dueDateAt: LessThan(now),
    });
    return result.affected > 0;
  }
}
