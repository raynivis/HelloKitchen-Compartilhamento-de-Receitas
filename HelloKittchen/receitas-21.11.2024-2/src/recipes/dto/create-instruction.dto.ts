import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateInstructionDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  step: string;
}
