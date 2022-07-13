import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { StringifyOptions } from 'querystring';
import { UserDetails } from 'src/user/user.interface';
import { UserModule } from 'src/user/user.module';
import { User, UserDocument } from 'src/user/user.schema';
import { Product } from './product.schema';
 
interface RequestWithProducts extends Request {
  product: Product
   //{
    // _id: ObjectId;
    // title: string
    // text: string;
    // tags: string;
    // author: 
    // { 
    //   _id: ObjectId;
    //   name: string;
    //   email: string;
    //   password: string;
    //   role: any;
    // }
  //}//any;
}
export default RequestWithProducts;