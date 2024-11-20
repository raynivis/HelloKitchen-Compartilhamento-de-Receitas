import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class QuerySearchDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
