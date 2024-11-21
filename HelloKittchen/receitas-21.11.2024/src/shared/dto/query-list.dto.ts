import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { QuerySearchDto } from './query-search.dto';

export class QueryListDto extends QuerySearchDto implements IPaginationOptions {
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number = 10;
}
