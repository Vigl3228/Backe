import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";

import mongoose, {Document, ObjectId} from 'mongoose'
import { Product } from "src/product/product.schema";
import { User } from "src/user/user.schema";

export type IdeaDocument = Idea & Document;

@Schema()
export class Idea {
    
    @Transform(({ value }) => value.toString())
    _id: ObjectId ; //ObjectId

    @Prop({ required: true})
    title: string;
    @Prop({ required: true})
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
    @Type(() => Product)
    product: Product;
    

}

export const IdeaSchema = SchemaFactory.createForClass(Idea);