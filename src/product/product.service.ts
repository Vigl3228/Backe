import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { NewUSerDTO } from 'src/user/dtos/new-user.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { CreateProductDto } from './dtos/new-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.schema';
import RequestWithProducts from './requestWithProd.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(productDto: CreateProductDto, author: User) {
    try {
      const newProduct = new this.productModel({
        ...productDto,
        author,
      });

      return newProduct.save();
    } catch (error) {
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  // async add(userDto: NewUSerDTO, products: Product){
  //     const newPost = new this.userModel({
  //         ...userDto,
  //         products
  //     })
  //     return newPost.save();

  // }
  async getById(id: ObjectId): Promise<Product> {
    try {
      return await this.productModel.findById(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async getPostsUser(req: RequestWithUser): Promise<Product[]> {
    const result = await this.productModel.find({ author: req.user });
    return result;
  }

  async getAll(): Promise<Product[]> {
    const result = await this.productModel.find();
    return result;
  }

  // async author(req: RequestWithAll) {
  //     console.log(req.user._id)
  //     console.log(req.products.author._id)
  //     if (req.products.author._id === req.user._id) {
  //       return true;
  //     } else {
  //     return false;}
  //   }
  ////

  async remove(id: ObjectId) {
    try {
      return await this.productModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: ObjectId, productdto: UpdateProductDto): Promise<Product> {
    try {
      return await this.productModel.findByIdAndUpdate(id, productdto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
