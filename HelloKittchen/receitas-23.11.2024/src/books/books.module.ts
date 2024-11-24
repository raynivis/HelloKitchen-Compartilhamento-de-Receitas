import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookRecipe } from './entities/book-recipe.entity';
import { BooksRecipesController } from './books-recipes.controller';
import { BooksRecipesService } from './books-recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRecipe])],
  controllers: [BooksController, BooksRecipesController],
  providers: [BooksService, BooksRecipesService],
})
export class BooksModule {}
