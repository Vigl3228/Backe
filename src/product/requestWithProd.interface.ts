import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { UserDetails } from 'src/user/user.interface';
import { UserModule } from 'src/user/user.module';
import { User, UserDocument } from 'src/user/user.schema';
 
interface RequestWithProducts extends Request {
  product:  {
    _id: number;
    title: string
    text: string;
    tags: string;
    author: 
    { 
      _id: number;
      name: string;
      email: string;
      password: string;}
  }//any;
}
export default RequestWithProducts;