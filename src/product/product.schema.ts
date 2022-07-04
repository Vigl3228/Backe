import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import mongoose, {Document} from 'mongoose'

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true})
    title: string;
    @Prop({ required: true, unique: true  })
    text: string;
    @Prop({default:[]})
    tags: string;

    @Prop({ default:0  })
    viewCounts: number;
    // @Prop({ ref:'User', required: true })
    // user: mongoose.Schema.Types.ObjectId;
    

}

export const ProductrSchema = SchemaFactory.createForClass(Product);