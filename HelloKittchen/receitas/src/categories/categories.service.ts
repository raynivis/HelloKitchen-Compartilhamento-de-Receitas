import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { RecordNotFoundException } from '@exceptions';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  findAll(search?: string): Promise<Category[]> {
    const where: FindOptionsWhere<Category> = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }

    return this.repository.find({ where });
  }

  async findOne(id: number): Promise<Category> {
    const record = await this.repository.findOneBy({ id });

    if (!record) throw new RecordNotFoundException();

    return record;
  }
}
