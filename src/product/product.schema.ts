import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";

import mongoose, {Document, ObjectId} from 'mongoose'
import { User } from "src/user/user.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    
    @Transform(({ value }) => value.toString())
    _id: number ; //ObjectId

    @Prop({ required: true})
    title: string;
    @Prop({ required: true, unique: true  })
    text: string;
    @Prop({ required: true})
    tags: string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    @Type(() => User)
    author: User;
    

}

export const ProductrSchema = SchemaFactory.createForClass(Product);