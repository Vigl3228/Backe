import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductrSchema } from 'src/product/product.schema';
import { ProductService } from 'src/product/product.service';
import { SubsSchema } from 'src/product/subs.schema';
import { UserModule } from 'src/user/user.module';
import { UserDocument, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { IdeaController } from './idea.controller';
import { IdeaSchema } from './idea.schema';
import { IdeaService } from './idea.service';

@Module({
  imports: [ 
    MongooseModule.forFeature([{name: 'Product', schema: ProductrSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Idea', schema: IdeaSchema}]),
    MongooseModule.forFeature([{name: 'Subs', schema: SubsSchema}]),

  ], 
  controllers: [IdeaController],
  providers: [IdeaService, UserService, ProductService],
 // exports: [Model<UserDocument>] //?
}) 
export class IdeaModule {}
