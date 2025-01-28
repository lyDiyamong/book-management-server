import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BookService } from './book.service';
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const result = await this.bookService.findAllBooks();
    return { message: 'Found', data: result };
  }
}
