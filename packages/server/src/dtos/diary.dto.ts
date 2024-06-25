import { ApiProperty } from '@nestjs/swagger';
import { PageInfo } from './common.dto';

export class CreateDiaryDto {
  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '내용' })
  contents: string;
}

export class UpdateDiaryDto {
  @ApiProperty({ description: '변경할 제목' })
  title?: string;

  @ApiProperty({ description: '변경할 내용' })
  contents?: string;
}

export class GetDiariesResponse {
  @ApiProperty({ type: () => DiaryDto, isArray: true })
  data: DiaryDto[];

  @ApiProperty()
  pageInfo: PageInfo;
}

export class DiaryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  contents: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
