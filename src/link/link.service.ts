import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generate } from 'shortid';
import CreateLinkDTO from './dto/create-link.dto';
import { Link, LinkDocument } from './schema/schema';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>) {}

  async get_all_links() {
    return this.linkModel.find();
  }

  async get_current_link(url: string) {
    return this.linkModel.findOne({
      or: [{ short_url: url }, { url: url }, { custom_link: url }],
    });
  }

  async create_link(dto: CreateLinkDTO) {
    await this.check_link(dto.url);

    const short_url = generate(dto.url);

    return this.linkModel.create({ ...dto, short_url: short_url });
  }

  async update_current_link(title: string, dto: CreateLinkDTO) {
    await this.check_link(dto.url);

    const short_url = generate(dto.url);

    const current_link = await this.get_current_link(title);

    return this.linkModel.findOneAndUpdate(
      current_link._id,
      {
        ...dto,
        short_url,
      },
      { new: true, upsert: true },
    );
  }

  async delete_current_link(title: string) {
    const current_link = await this.get_current_link(title);

    await this.linkModel.findByIdAndDelete(current_link.id);

    return current_link.id;
  }

  async check_link(url: string) {
    try {
      const current_link = await this.get_current_link(url);

      if (!current_link) return current_link;
    } catch (e) {
      throw new HttpException(
        'Такой URL уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
