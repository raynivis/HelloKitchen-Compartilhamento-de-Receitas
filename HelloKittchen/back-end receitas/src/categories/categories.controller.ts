import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { IsPublic } from '@shared/decorators';
import { QuerySearchDto } from '@shared/dto/query-search.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOkResponse({ type: Category, isArray: true })
  @IsPublic()
  @Get()
  findAll(@Query() query: QuerySearchDto) {
    return this.categoriesService.findAll(query.search);
  }

  @ApiOkResponse({ type: Category })
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
}
