import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserService } from 'src/user/user.service';
import { ChatService } from 'src/chat/chat.service';
import { UserSchema } from 'src/user/user.schema';
import { ProductrSchema } from 'src/product/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'src/chat/chat.schema';
import { MessageSchema } from './message.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([{name: 'Product', schema: ProductrSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]),
    MongooseModule.forFeature([{name: 'Chat', schema: ChatSchema}]),
  ], 
  controllers: [MessageController],
  providers: [MessageService],
 // exports: [Model<UserDocument>] //?
}) 
export class MessageModule {}