import { RecordNotFoundException } from '@exceptions';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import {
  Equal,
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  IsNull,
  Not,
  Repository,
} from 'typeorm';

import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { QueryListDto } from '@shared/dto/query-list.dto';
import { RecipeIsPublishedException } from '@exceptions/recipe-is-published.exception';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { REQUEST } from '@nestjs/core';
import { RecipeNotBelongUserException } from '@exceptions/recipe-not-belong-user-.exception';
import { Instruction } from './entities/instruction.entity';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { User } from 'src/auth/users/entities/user.entity';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RecipeIsNotPublishedException } from '@exceptions/recipe-is-not-published.exception';
import { RecipeIsRateException } from '@exceptions/recipe-is-rating.exception';

@Injectable({ scope: Scope.REQUEST })
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private repository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private repositoryIngredient: Repository<Ingredient>,
    @InjectRepository(Instruction)
    private repositoryInstruction: Repository<Instruction>,
    @InjectRepository(Rating)
    private repositoryRating: Repository<Rating>,
    @Inject(REQUEST)
    private request: Request | any,
  ) {}

  create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const record = this.repository.create(createRecipeDto);
    return this.repository.save(record);
  }

  findAll(query: QueryListDto, user?: User): Promise<Pagination<Recipe>> {
    const where: FindOptionsWhere<Recipe>[] = [];
    if (query.search) where.push({ name: ILike(`%${query.search}%`) });
    if (user) where.push({ user: { id: user.id } });
    else where.push({ published_at: Not(IsNull()) });

    return paginate<Recipe>(this.repository, query, { where });
  }

  async findOne(id: number): Promise<Recipe> {
    const record = await this.repository.findOneBy({ id });
    if (!record) throw new RecordNotFoundException();

    return record;
  }

  async findOnePublic(id: number, user: User): Promise<Recipe> {
    const record = await this.findOne(id);
    if (
      (user && !record.published_at && record.user.id !== user.id) ||
      (!user && !record.published_at)
    )
      throw new RecordNotFoundException();

    return record;
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto | { published_at: Date },
  ): Promise<Recipe> {
    await this.checkCanUpdate(id);
    await this.repository.update(id, updateRecipeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.checkCanUpdate(id);
    const record = await this.repository.delete(id);
    if (!record?.affected) {
      throw new RecordNotFoundException();
    }
  }

  async addIngredient(
    recipeId: number,
    createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    await this.checkCanUpdate(recipeId);
    const record = this.repositoryIngredient.create({
      ...createIngredientDto,
      recipe: { id: recipeId },
    });
    return this.repositoryIngredient.save(record);
  }

  async removeIngredient(recipeId: number, id: number) {
    this.checkCanUpdate(recipeId);
    const record = await this.repositoryIngredient.delete({
      id,
      recipe: { id: recipeId },
    });
    if (!record?.affected) {
      throw new RecordNotFoundException();
    }
  }

  async addInstruction(
    recipeId: number,
    createInstructionDto: CreateInstructionDto,
  ): Promise<Instruction> {
    await this.checkCanUpdate(recipeId);
    const record = this.repositoryInstruction.create({
      ...createInstructionDto,
      recipe: { id: recipeId },
    });
    return this.repositoryInstruction.save(record);
  }

  async removeInstruction(recipeId: number, id: number) {
    this.checkCanUpdate(recipeId);
    const record = await this.repositoryInstruction.delete({
      id,
      recipe: { id: recipeId },
    });
    if (!record?.affected) {
      throw new RecordNotFoundException();
    }
  }

  async addRating(
    user: User,
    recipeId: number,
    CreateRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    const recipe = await this.findOne(recipeId);
    if (!recipe?.published_at) throw new RecipeIsNotPublishedException();
    if (await this.repositoryRating.countBy({ recipe, user }))
      throw new RecipeIsRateException();

    const record = this.repositoryRating.create({
      ...CreateRatingDto,
      recipe,
      user,
    });
    const rating = await this.repositoryRating.save(record);
    const average = await this.repositoryRating.average('rating', {
      recipe: { id: recipeId },
    });
    this.repository.update(recipeId, { score: average });
    return rating;
  }

  private async checkCanUpdate(id: number) {
    const record = await this.findOne(id);
    if (!!record?.published_at) throw new RecipeIsPublishedException();
    if (record.user.id !== this.request.user?.id)
      throw new RecipeNotBelongUserException();
  }
}
