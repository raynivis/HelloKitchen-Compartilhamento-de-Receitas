import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  dateCreated: Date;

  @ApiProperty()
  lastUpdated: Date;
}
