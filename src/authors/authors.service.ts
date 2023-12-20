import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorInput: CreateAuthorInput) {
    return this.authorRepository.save(createAuthorInput);
  }

  findAll() {
    return this.authorRepository.find();
  }

  findOne(id: number) {
    return this.authorRepository.findOneBy({ id });
  }

  update(id: number, updateAuthorInput: CreateAuthorInput) {
    return this.authorRepository.update({ id }, updateAuthorInput);
  }

  async remove(id: number) {
    const { affected } = await this.authorRepository.delete({ id });
    return affected > 0;
  }
}
