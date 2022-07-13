import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import RequestWithChat from 'src/chat/requestWithChat';
import { CreateMessageDto } from './dtos/new-message.dto';
import { Message } from './message.schema';
import { MessageService } from './message.service';
import RequestWithMessage from './requestWithMes';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}


  @Get(':id')
  async getOne(@Param('id') id: ObjectId): Promise<Message> {
    return await this.messageService.getById(id);
  }

  
  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    return this.messageService.getAll();
  }

  
  @Post('create')
  @UseGuards(JwtGuard)
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() req: RequestWithUser,
    @Req() req2: RequestWithChat,

  ) {
    return await this.messageService.create(createMessageDto, req.user, req2.chat);
  }



}
