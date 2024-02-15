import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import slugify from 'slugify';
import sharp from 'sharp';
import { Storage } from '@google-cloud/storage';

const storage = new Storage();

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, cover: Express.Multer.File) {
    const name = slugify(createBookDto.name, { lower: true });
    const ext = cover.originalname.split('.').pop();
    const coverName = `${Date.now()}-${name}.${ext}`;

    const buffer = await sharp(cover.buffer).resize(200, 350).toBuffer();
    await storage
      .bucket('my-books-404218.appspot.com')
      .file(`covers/${coverName}`)
      .save(buffer);
    return await this.bookRepository.save({ ...createBookDto, coverName });
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: number) {
    return this.bookRepository.findOneBy({ id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update({ id }, updateBookDto);
  }

  async remove(id: number) {
    const { affected } = await this.bookRepository.delete({ id });
    return affected > 0;
  }
}
