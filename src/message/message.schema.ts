import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";

import mongoose, {Document, ObjectId} from 'mongoose'
import { Chat } from "src/chat/chat.schema";
import { User } from "src/user/user.schema";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    
    @Transform(({ value }) => value.toString())
    _id: ObjectId ; //ObjectId

    @Prop({ required: true})
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Chat" })
    @Type(() => Chat)
    chat: Chat;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    @Type(() => User)
    author: User;

}

export const MessageSchema = SchemaFactory.createForClass(Message);