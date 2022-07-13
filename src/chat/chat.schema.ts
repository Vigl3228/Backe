import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";

import mongoose, {Document, ObjectId} from 'mongoose'
import { Message } from "src/message/message.schema";
import { Product } from "src/product/product.schema";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
    
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ required: true})
    name: string;

    @Prop()
    content: string[];

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Message" })
    // @Type(() => Message)
    // cont: Message;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
    @Type(() => Product)
    product: Product;

}

export const ChatSchema = SchemaFactory.createForClass(Chat);