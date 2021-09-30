import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Delete,
  Post,
  Body,
  Param,
  Response,
  UseGuards,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import CreateLinkDTO from './dto/create-link.dto';
import ILink from './interfaces/link.interface';
import { LinkGuard } from './link.guard';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController implements ILink<CreateLinkDTO, string> {
  constructor(private linkService: LinkService) {}

  @ApiOperation({
    summary: 'Return all links',
  })
  @ApiResponse({
    type: [String],
    description: 'Should be return all links',
  })
  @Get('/all')
  async get_all_links(): Promise<CreateLinkDTO[]> {
    try {
      return this.linkService.get_all_links();
    } catch (e) {
      throw new HttpException(
        'Ой, не удалось получить все ссылки :(',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({
    summary: 'Return a current link',
  })
  @ApiResponse({
    type: String,
    description: 'Should be return a current link by her short_url',
  })
  @Get('/current/:url')
  async get_current_link(@Param('url') url: string): Promise<CreateLinkDTO> {
    try {
      return this.linkService.get_current_link(url);
    } catch (e) {
      throw new HttpException(
        'Ой, не удалось получить конкретный URL адрес',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({
    summary: 'Go to the short link',
  })
  @ApiResponse({
    type: String,
    description: 'Should be go to the short link',
  })
  @Get('/redirect/:title')
  async go_to_short_link(@Param('title') title: string, @Res() res) {
    try {
      const { url } = await this.linkService.get_current_link(title);

      return res.redirect(url);
    } catch (e) {
      throw new HttpException(
        'Не удалось перейти по ссылке',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({
    summary: 'Create a new link',
  })
  @ApiResponse({
    type: String,
    description: 'Should be create a new link',
  })
  @Post('/create')
  @UseGuards(LinkGuard)
  async create_link(@Body() dto: CreateLinkDTO): Promise<CreateLinkDTO> {
    try {
      return this.linkService.create_link(dto);
    } catch (e) {
      throw new HttpException(
        'Не удалось создать ссылку',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({
    summary: 'Update a current link',
  })
  @ApiResponse({
    type: String,
    description: 'Should be update a current link by her short_link',
  })
  @Put('/update/:title')
  @UseGuards(LinkGuard)
  async update_current_link(
    @Param() title: string,
    @Body() dto: CreateLinkDTO,
  ) {
    try {
      return this.linkService.update_current_link(title, dto);
    } catch (e) {
      throw new HttpException(
        'Не удалось обновить конкретную ссылку',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({
    summary: 'Delete a current link',
  })
  @ApiResponse({
    type: Number,
    description: 'Should be delete a current link by her short url',
  })
  @Delete('/delete/:title')
  async delete_current_link(@Param('title') title: string): Promise<number> {
    try {
      return this.linkService.delete_current_link(title);
    } catch (e) {
      throw new HttpException(
        'Не удалось удалить конкретную ссылку',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
