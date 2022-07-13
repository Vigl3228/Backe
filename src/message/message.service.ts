import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { request } from 'http';
import { Model, ObjectId } from 'mongoose';
import { Chat } from 'src/chat/chat.schema';
import { User } from 'src/user/user.schema';
import { CreateMessageDto } from './dtos/new-message.dto';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async create(messageDto: CreateMessageDto, author: User, chat: Chat) {
    try {
      const newMessage = new this.messageModel({
        ...messageDto,
        author,
        chat
      });
      return newMessage.save();
    } catch (error) {
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
    }
  }
  
  async getById(id: ObjectId): Promise<Message> {
    try {
      return await this.messageModel.findById(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }


  async getAll(){
    const result = await this.messageModel.find();
    return result;
  }
}
