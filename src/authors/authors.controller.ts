import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthorInput } from './dto/create-author.input';
import { GetAuthorInput } from './dto/get-author.input';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'The records have been successfully retrieved.',
    type: [Author],
  })
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully retrieved.',
    type: Author,
  })
  findOne(@Param() params: GetAuthorInput): Promise<Author> {
    return this.authorsService.findOne(params.id);
  }

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Author,
  })
  create(@Body() createAuthorDto: CreateAuthorInput): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully deleted.',
    type: Boolean,
  })
  delete(@Param() params: GetAuthorInput): Promise<boolean> {
    return this.authorsService.remove(params.id);
  }
}
