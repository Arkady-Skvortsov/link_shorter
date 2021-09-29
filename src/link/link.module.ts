import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { Link, LinkSchema } from './schema/schema';

@Module({
  providers: [LinkService],
  controllers: [LinkController],
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
  exports: [LinkService],
})
export class LinkModule {}
