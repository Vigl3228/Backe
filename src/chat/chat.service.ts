import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private messageModel: Model<ChatDocument>,
  ) {}

  async create(messageDto: CreateChatDto,  chat: Chat) {
    try {
      const newMessage = new this.messageModel({
        ...messageDto,
        chat
      });
      return newMessage.save();
    } catch (error) {
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
    }
  }


 

}
