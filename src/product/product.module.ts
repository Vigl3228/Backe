import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { Product, ProductrSchema } from './product.schema';
import { ProductService } from './product.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductrSchema}])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
