import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { QueryListDto } from '@shared/dto/query-list.dto';

export class QueryListRecipeDto extends QueryListDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  category?: number;
}
