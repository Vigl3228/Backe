import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductrSchema } from 'src/product/product.schema';
import { UserSchema } from 'src/user/user.schema';
import { MessageSchema } from 'src/message/message.schema';
import { ChatSchema } from './chat.schema';
import { SubsSchema } from 'src/product/subs.schema';
import { IdeaSchema } from 'src/idea/idea.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([{name: 'Product', schema: ProductrSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]),
    MongooseModule.forFeature([{name: 'Chat', schema: ChatSchema}]),
    MongooseModule.forFeature([{name: 'Subs', schema: SubsSchema}]),
    MongooseModule.forFeature([{name: 'Idea', schema: IdeaSchema}]),
  ], 
  controllers: [ChatController],
  providers: [ChatService],
 // exports: [Model<UserDocument>] //?
}) 
export class ChatModule {}