import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

//  @Post()
//   create(@Body() createChatDto: CreateChatDto) {
//     return this.chatService.create(createChatDto);
//   } 
// @Post('create')
// @UseGuards(JwtGuard)
// async create(
//   @Body() createChatDto: CreateChatDto,
//   @Req() req: RequestWithUser,
//   @Req() req2: RequestWithChat,

// ) {
//   return await this.messageService.create(createMessageDto, req.user, req2.chat);
// }


//   @Get()
//   async getAllPosts(
//   ) {
//     return await this.chatService.findAllMessage();
//   }
}

