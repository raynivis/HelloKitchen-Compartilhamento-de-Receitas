import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { QueryListDto } from '@shared/dto/query-list.dto';
import { BodyUser } from '@shared/decorators/body-user.decorator';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Recipe } from './entities/recipe.entity';
import { ApiPaginatedResponse, CurrentUser, IsPublic } from '@shared/decorators';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { Instruction } from './entities/instruction.entity';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { Rating } from './entities/rating.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiBody({ type: CreateRecipeDto })
  @ApiCreatedResponse({ type: Recipe })
  @Post()
  create(@BodyUser() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @ApiPaginatedResponse(Recipe)
  @IsPublic()
  @Get()
  findAll(@Query() query: QueryListDto) {
    return this.recipesService.findAll(query);
  }

  @ApiPaginatedResponse(Recipe)
  @Get('mine')
  findAllMine(@CurrentUser() user: User, @Query() query: QueryListDto) {
    return this.recipesService.findAll(query, user);
  }

  @ApiOkResponse({ type: Recipe })
  @IsPublic()
  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.recipesService.findOnePublic(id, user);
  }

  @ApiOkResponse({ type: Recipe })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.recipesService.remove(id);
  }

  @ApiOkResponse({ type: Recipe })
  @Patch(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.update(id, { published_at: new Date() });
  }

  @ApiCreatedResponse({ type: Ingredient })
  @Post(':recipeId/ingredients')
  addIngredient(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() createIngredientDto: CreateIngredientDto,
  ) {
    return this.recipesService.addIngredient(recipeId, createIngredientDto);
  }

  @ApiNoContentResponse()
  @Delete(':recipeId/ingredients/:id')
  @HttpCode(204)
  removeIngredient(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.recipesService.removeIngredient(recipeId, id);
  }

  @ApiCreatedResponse({ type: Instruction })
  @Post(':recipeId/instructions')
  addInstruction(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() createInstructionDto: CreateInstructionDto,
  ) {
    return this.recipesService.addInstruction(recipeId, createInstructionDto);
  }

  @ApiNoContentResponse()
  @Delete(':recipeId/instructions/:id')
  @HttpCode(204)
  removeInstruction(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.recipesService.removeInstruction(recipeId, id);
  }

  @ApiCreatedResponse({ type: Rating })
  @Post(':recipeId/rating')
  addRating(
    @CurrentUser() user: User,
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.recipesService.addRating(user, recipeId, createRatingDto);
  }
}
