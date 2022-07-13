import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";

import mongoose, {Document, ObjectId} from 'mongoose'
import { User } from "src/user/user.schema";
import { Subs } from "./subs.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    
    @Transform(({ value }) => value.toString())
    _id: ObjectId ; //ObjectId

    @Prop()
    num: string;

    @Prop({ required: true})
    title: string;
    @Prop({ required: true, unique: true  })
    text: string;
    @Prop({ required: true})
    tags: string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    @Type(() => User)
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Subs" })
    @Type(() => Subs)
    subs: Subs[];

   



}

export const ProductrSchema = SchemaFactory.createForClass(Product);