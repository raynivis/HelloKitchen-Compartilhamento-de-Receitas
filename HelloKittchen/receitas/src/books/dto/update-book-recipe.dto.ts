import { CreateBookRecipeDto } from './create-book-recipe.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateBookRecipeDto extends OmitType(CreateBookRecipeDto, [
  'recipe',
]) {}
