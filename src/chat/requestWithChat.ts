import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { UserDetails } from 'src/user/user.interface';
import { UserModule } from 'src/user/user.module';
import { User, UserDocument } from 'src/user/user.schema';
import { Chat } from './chat.schema';
 
interface RequestWithChat extends Request {
  chat: Chat//any;
}
export default RequestWithChat;