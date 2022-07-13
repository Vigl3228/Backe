import { Request } from 'express';
import { ObjectId } from 'mongoose';

 
interface RequestWithMessage extends Request {
  message: //Message
   {
    _id: ObjectId;
    name: string
    chat: {_id: ObjectId}
    author: 
    {_id: ObjectId;
      name: string;}
  }//any;
}
export default RequestWithMessage;