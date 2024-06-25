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
import { Guest_BooksService } from './guest_books.service';
import {
  CreateGuestBookDto,
  GetGuestBooksResponse,
  UpdateGuestBookDto,
} from 'src/dtos/guest_book.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Guest_Book } from 'src/entities/guest_books.entity';

@ApiTags('guest-book')
@Controller('guest-books')
export class Guest_BooksController {
  constructor(private readonly guest_bookService: Guest_BooksService) {}

  @Get()
  @ApiOkResponse({ type: GetGuestBooksResponse })
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
    return this.guest_bookService.get(page, size);
  }

  @Post()
  @ApiOkResponse({ type: Guest_Book })
  async create(@Body() createGuestBookRequest: CreateGuestBookDto) {
    return this.guest_bookService.create(createGuestBookRequest);
  }

  @Patch(`:id`)
  @ApiOkResponse({ type: Guest_Book })
  async update(
    @Param(`id`) id: number,
    @Body() updateGuestBookRequest: UpdateGuestBookDto,
  ) {
    return this.guest_bookService.update(id, updateGuestBookRequest);
  }

  @Delete(`:id`)
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(@Param(`id`) id: number) {
    return this.guest_bookService.delete(id);
  }
}
