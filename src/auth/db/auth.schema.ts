import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
