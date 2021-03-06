import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdeaSchema } from 'src/idea/idea.schema';
import { IdeaService } from 'src/idea/idea.service';
import { UserModule } from 'src/user/user.module';
import { UserDocument, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { ProductController } from './product.controller';
import { Product, ProductrSchema } from './product.schema';
import { ProductService } from './product.service';
import { SubsSchema } from './subs.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([{name: 'Product', schema: ProductrSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Subs', schema: SubsSchema}]),
    MongooseModule.forFeature([{name: 'Idea', schema: IdeaSchema}])
  ], 
  controllers: [ProductController],
  providers: [ProductService, UserService, IdeaService],
 // exports: [Model<UserDocument>] //?
}) 
export class ProductModule {}
