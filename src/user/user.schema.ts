import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';

import mongoose, { Document, ObjectId } from 'mongoose';
import Role from 'src/auth/guards/role.enum';
import { Product } from 'src/product/product.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    //type: 'enum',
    enum: Role,
    default: Role.User,
  })
   role: Role;
  ///////err
}

export const UserSchema = SchemaFactory.createForClass(User);
