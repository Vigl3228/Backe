import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) {}
  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }


  async findAllMessage() {
    return this.chatModel.find().populate('message');
  }

}
