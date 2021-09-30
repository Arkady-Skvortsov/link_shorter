import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  short_url: string;

  @Prop({ type: String })
  custom_link: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
