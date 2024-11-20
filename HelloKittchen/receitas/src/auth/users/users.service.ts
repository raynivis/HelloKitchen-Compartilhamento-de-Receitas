/* eslint-disable @typescript-eslint/no-unused-vars */
import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    const { password, ...result } = await this.repository.save(user);
    return result as User;
  }

  findAll(options: IPaginationOptions, search?: string): Promise<Pagination<User>> {
    const where: FindOptionsWhere<User> = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }

    return paginate<User>(this.repository, options, { where });
  }

  async findOne(id: number): Promise<User> {
    const bankBranch = await this.repository.findOneBy({ id });

    if (!bankBranch) {
      throw new RecordNotFoundException();
    }

    return bankBranch;
  }

  async findByEmail(email: string, includePassowrd: boolean = false): Promise<User> {
    const user = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (includePassowrd) {
      return user;
    } else {
      const { password, ...result } = user;
      return result as User;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.repository.update(id, updateUserDto);
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new RecordNotFoundException();
    }

    return user;
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.repository.delete(id);

    if (!user?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}