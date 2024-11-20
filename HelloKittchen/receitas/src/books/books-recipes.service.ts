import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { User } from 'src/auth/users/entities/user.entity';
import { CreateBookRecipeDto } from './dto/create-book-recipe.dto';
import { BookRecipe } from './entities/book-recipe.entity';
import { QueryListDto } from '@shared/dto/query-list.dto';
import { UpdateBookRecipeDto } from './dto/update-book-recipe.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class BooksRecipesService {
  constructor(
    @InjectRepository(BookRecipe) private repository: Repository<BookRecipe>,
    private readonly booksService: BooksService,
  ) {}

  async create(
    user: User,
    bookId: number,
    createBookRecipeDto: CreateBookRecipeDto,
  ): Promise<BookRecipe> {
    this.booksService.findOne(user, bookId);
    const record = this.repository.create({
      ...createBookRecipeDto,
      book: { id: bookId },
    });
    return await this.repository.save(record);
  }

  findAll(
    user: User,
    bookId: number,
    query: QueryListDto,
  ): Promise<Pagination<BookRecipe>> {
    const where: FindOptionsWhere<BookRecipe>[] = [
      { book: { id: bookId, user: { id: user?.id } } },
    ];
    if (query?.search) {
      where.push({ recipe: { name: ILike(`%${query?.search}%`) } });
    }

    return paginate<BookRecipe>(this.repository, query, { where });
  }

  async findOne(user: User, bookId: number, id: number): Promise<BookRecipe> {
    const record = await this.repository.findOneBy({
      id,
      book: { id: bookId, user: { id: user?.id } },
    });
    if (!record) throw new RecordNotFoundException();
    return record;
  }

  async update(
    user: User,
    bookId: number,
    id: number,
    updateBookRecipeDto: UpdateBookRecipeDto,
  ): Promise<BookRecipe> {
    this.booksService.findOne(user, bookId);
    await this.repository.update(id, updateBookRecipeDto);
    return this.findOne(user, bookId, id);
  }

  async remove(user: User, bookId: number, id: number): Promise<boolean> {
    this.booksService.findOne(user, bookId);
    const record = await this.repository.delete(id);
    if (!record?.affected) throw new RecordNotFoundException();
    return true;
  }
}
