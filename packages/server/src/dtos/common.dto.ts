import { ApiProperty } from '@nestjs/swagger';

export class PageInfo {
  @ApiProperty()
  page: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  total: number;
}
