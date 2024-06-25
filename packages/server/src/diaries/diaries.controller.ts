import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DiariesService } from './diaries.service';
import {
  CreateDiaryDto,
  GetDiariesResponse,
  UpdateDiaryDto,
} from 'src/dtos/diary.dto';
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Diaries } from 'src/entities/diaries.entity';

@ApiTags('diaries')
@Controller('diaries')
export class DiariesController {
  constructor(private readonly diryService: DiariesService) {}

  @Get()
  @ApiResponse({ type: GetDiariesResponse })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'size',
    required: true,
    type: Number,
    example: 5,
    description: 'Page size',
  })
  async get(@Query('page') page: number = 1, @Query('size') size: number = 10) {
    return this.diryService.get(page, size);
  }

  @Post()
  @ApiOkResponse({ type: Diaries })
  async create(@Body() createDiaryRequest: CreateDiaryDto) {
    return this.diryService.create(createDiaryRequest);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Diaries })
  async update(
    @Param(`id`) id: number,
    @Body() updateDiaryRequest: UpdateDiaryDto,
  ) {
    return this.diryService.update(id, updateDiaryRequest);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(@Param(`id`) id: number) {
    return this.diryService.delete(id);
  }
}
