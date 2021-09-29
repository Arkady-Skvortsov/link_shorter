import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import CreateLinkDTO from './dto/create-link.dto';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get('/all')
  async get_all_links() {
    try {
      return this.linkService;
    } catch (e) {
      throw new HttpException(
        'Ой, не удалось получить все ссылки :(',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async get_current_link(title: string) {
    try {
      return this.linkService;
    } catch (e) {
      throw new HttpException(
        'Ой, не удалось получить конкретный URL адресс',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create_link(dto: CreateLinkDTO) {
    try {
      return this.linkService;
    } catch (e) {
      throw new HttpException(
        'Не удалось создать ссылку',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update_current_link(title: string, dto: CreateLinkDTO) {
    try {
      return this.linkService;
    } catch (e) {
      throw new HttpException(
        'Не удалось обновить конкретную ссылку',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete_current_link(title: string) {
    try {
      return this.linkService;
    } catch (e) {
      throw new HttpException(
        'Не удалось удалить конкретную ссылку',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
