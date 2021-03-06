import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { ProductrSchema } from 'src/product/product.schema';
import { SubsSchema } from 'src/product/subs.schema';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  MongooseModule.forFeature([{name: 'Subs', schema: SubsSchema}]),
  MongooseModule.forFeature([{name: 'Product', schema: ProductrSchema}]),

],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
