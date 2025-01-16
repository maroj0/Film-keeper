import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema({ collection: 'films', timestamps: true })
export class Film {
  @Prop()
  title: string;

  @Prop({ type: Date })
  release_date: Date;

  @Prop()
  producer: string;

  @Prop()
  director: string;

  @Prop()
  gender: string;

  @Prop({ maxlength: 500 })
  synopsis: string;

  @Prop({ type: String, required: true, trim: true })
  cover: string;

  //add characters
}

export const FilmSchema = SchemaFactory.createForClass(Film);
