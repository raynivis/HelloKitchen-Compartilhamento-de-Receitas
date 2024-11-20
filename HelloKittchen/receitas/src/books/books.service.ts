import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { QueryListDto } from '@shared/dto/query-list.dto';
import { User } from 'src/auth/users/entities/user.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repository: Repository<Book>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const record = this.repository.create(createBookDto);
    return await this.repository.save(record);
  }

  findAll(user: User, query: QueryListDto): Promise<Pagination<Book>> {
    const where: FindOptionsWhere<Book>[] = [{ user: { id: user?.id } }];
    if (query?.search) {
      where.push({ name: ILike(`%${query?.search}%`) });
    }

    return paginate<Book>(this.repository, query, { where });
  }

  async findOne(user: User, id: number): Promise<Book> {
    const record = await this.repository.findOneBy({
      user: { id: user?.id },
      id,
    });
    if (!record) throw new RecordNotFoundException();
    return record;
  }

  async update(
    user: User,
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    this.findOne(user, id);
    await this.repository.update(id, updateBookDto);
    return this.findOne(user, id);
  }

  async remove(user: User, id: number): Promise<boolean> {
    this.findOne(user, id);
    const record = await this.repository.delete(id);
    if (!record?.affected) throw new RecordNotFoundException();
    return true;
  }
}
