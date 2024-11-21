import { IsInt, IsPositive } from 'class-validator';

export class RelationEntityDto {
  @IsInt()
  @IsPositive()
  id: number;
}
