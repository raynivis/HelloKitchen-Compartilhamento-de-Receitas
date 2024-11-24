import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RelationEntityDto } from '@shared/dto/relation-entity.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookRecipeDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  recipe: RelationEntityDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  notes: string;
}
