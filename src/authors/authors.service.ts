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

  async findAll() {
    const authors = await this.authorRepository.find({ relations: ['books'] });
    return authors.map((author) => ({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      totalBooks: author.books.length,
    }));
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
