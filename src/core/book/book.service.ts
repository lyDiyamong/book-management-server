import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllBooks(): Promise<Book[]> {
    const books = await this.prisma.book.findMany();
    return books;
  }
  async findUnique(id: Book['id']): Promise<Book> {
    const books = await this.prisma.book.findUnique({ where: { id } });
    return books;
  }
  async createBook(data: Book): Promise<Book> {
    const books = await this.prisma.book.create({
      data,
    });
    return books;
  }
}
