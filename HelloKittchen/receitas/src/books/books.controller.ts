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
import { BooksService } from './books.service';
import { QueryListDto } from '@shared/dto/query-list.dto';
import { User } from 'src/auth/users/entities/user.entity';
import { ApiPaginatedResponse, CurrentUser } from '@shared/decorators';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from './entities/book.entity';
import { BodyUser } from '@shared/decorators/body-user.decorator';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ type: Book })
  @Post()
  create(@BodyUser() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiPaginatedResponse(Book)
  @Get()
  findAll(@CurrentUser() user: User, @Query() query: QueryListDto) {
    return this.booksService.findAll(user, query);
  }

  @ApiOkResponse({ type: Book })
  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(user, id);
  }

  @ApiOkResponse({ type: Book })
  @Patch(':id')
  update(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(user, id, updateBookDto);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  remove(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(user, id);
  }
}
