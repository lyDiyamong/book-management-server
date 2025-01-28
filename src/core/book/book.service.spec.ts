import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from './book.service';
import { Book } from '@prisma/client';

const mockBook: Book = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  isbn: '123-4567890123',
  published: true,
  coverImg: 'http://test.com/cover.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: '2',
};

const mockPrismaService = {
  book: {
    findMany: jest.fn().mockResolvedValue([mockBook]),
    findUnique: jest.fn().mockResolvedValue(mockBook),
    create: jest.fn().mockResolvedValue(mockBook),
    update: jest.fn().mockResolvedValue(mockBook),
    delete: jest.fn().mockResolvedValue(mockBook),
  },
};

describe('BookService', () => {
  let service: BookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllBook', () => {
    it('should return array of books', async () => {
      const result = await service.findAllBooks();
      expect(result).toEqual([mockBook]);
      expect(prisma.book.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single book by ID', async () => {
      const result = await service.findUnique('1');
      expect(result).toEqual(mockBook);
      expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createDto = {
        title: 'New Book',
        author: 'New Author',
        isbn: '987-6543210987',
      };

      const result = await service.createBook(createDto);
      expect(result).toEqual(mockBook);
      expect(prisma.book.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });
  });
});
