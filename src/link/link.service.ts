import { Injectable } from '@nestjs/common';
import * as short_id from 'short-id';
import CreateLinkDTO from './dto/create-link.dto';

@Injectable()
export class LinkService {
  constructor() {}

  async get_all_links() {}

  async get_current_link(title: string) {}

  async create_link(dto: CreateLinkDTO) {}

  async update_current_link(title: string, dto: CreateLinkDTO) {}

  async delete_current_link(title: string) {}
}
