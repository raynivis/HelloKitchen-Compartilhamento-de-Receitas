import { ApiProperty } from '@nestjs/swagger';
import { RelationEntityDto } from '@shared/dto/relation-entity.dto';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  category: RelationEntityDto;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  preparationTime: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  portion: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  calories: number;
}
