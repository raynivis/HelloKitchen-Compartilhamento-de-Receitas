import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRecipesService } from './books-recipes.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBookRecipeDto } from './dto/create-book-recipe.dto';
import { BookRecipe } from './entities/book-recipe.entity';
import { BodyUser } from '@shared/decorators/body-user.decorator';
import { ApiPaginatedResponse, CurrentUser } from '@shared/decorators';
import { User } from 'src/auth/users/entities/user.entity';
import { QueryListDto } from '@shared/dto/query-list.dto';
import { UpdateBookRecipeDto } from './dto/update-book-recipe.dto';

@ApiTags('books-recipes')
@Controller('books/:bookId/recipes')
export class BooksRecipesController {
  constructor(private readonly booksRecipesService: BooksRecipesService) {}

  @ApiCreatedResponse({ type: BookRecipe })
  @Post()
  create(
    @CurrentUser() user: User,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() createBookRecipeDto: CreateBookRecipeDto,
  ) {
    return this.booksRecipesService.create(user, bookId, createBookRecipeDto);
  }

  @ApiPaginatedResponse(BookRecipe)
  @Get()
  findAll(
    @CurrentUser() user: User,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Query() query: QueryListDto,
  ) {
    return this.booksRecipesService.findAll(user, bookId, query);
  }

  @ApiOkResponse({ type: BookRecipe })
  @Get(':id')
  findOne(
    @CurrentUser() user: User,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.booksRecipesService.findOne(user, bookId, id);
  }

  @ApiOkResponse({ type: BookRecipe })
  @Patch(':id')
  update(
    @CurrentUser() user: User,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookRecipeDto: UpdateBookRecipeDto,
  ) {
    return this.booksRecipesService.update(
      user,
      bookId,
      id,
      updateBookRecipeDto,
    );
  }

  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  remove(
    @CurrentUser() user: User,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.booksRecipesService.remove(user, bookId, id);
  }
}
