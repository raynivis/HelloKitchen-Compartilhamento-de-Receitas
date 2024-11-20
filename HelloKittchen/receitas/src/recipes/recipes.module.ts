import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Rating } from './entities/rating.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Instruction } from './entities/instruction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Rating, Ingredient, Instruction]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
