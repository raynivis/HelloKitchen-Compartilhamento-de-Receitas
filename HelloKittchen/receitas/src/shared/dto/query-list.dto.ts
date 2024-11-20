import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { QuerySearchDto } from './query-search.dto';

export class QueryListDto extends QuerySearchDto implements IPaginationOptions {
  @ApiPropertyOptional()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional()
  @IsPositive()
  @IsOptional()
  limit: number = 10;
}
