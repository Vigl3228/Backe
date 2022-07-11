import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";

import mongoose, {Document} from 'mongoose'
import { Product } from "src/product/product.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Transform(({ value }) => value.toString())
    _id: number;
    @Prop({ required: true})
    name: string;
    @Prop({ required: true, unique: true  })
    email: string;
    @Prop({ required: true })
    password: string;

    ///////err
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product"})
    @Type(() => Product)
    products: Product;


    
}



export const UserSchema = SchemaFactory.createForClass(User);