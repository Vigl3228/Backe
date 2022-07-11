import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModule } from 'src/user/user.module';
import { UserDocument, UserSchema } from 'src/user/user.schema';
import { ProductController } from './product.controller';
import { Product, ProductrSchema } from './product.schema';
import { ProductService } from './product.service';

@Module({
  imports: [ 
    MongooseModule.forFeature([{name: 'Product', schema: ProductrSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ], 
  controllers: [ProductController],
  providers: [ProductService],
 // exports: [Model<UserDocument>] //?
}) 
export class ProductModule {}
