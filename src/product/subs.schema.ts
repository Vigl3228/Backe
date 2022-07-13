import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";

import mongoose, {Document, ObjectId} from 'mongoose'
import { User } from "src/user/user.schema";
import { Product } from "./product.schema";

export type SubsDocument = Subs & Document;

@Schema()
export class Subs {
    
    @Transform(({ value }) => value.toString())
    _id: ObjectId ;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
    @Type(() => Product)
    product: Product;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    @Type(() => User)
    user: User;
}

export const SubsSchema = SchemaFactory.createForClass(Subs);