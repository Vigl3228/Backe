import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { check } from 'prettier';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { NewUSerDTO } from 'src/user/dtos/new-user.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateProductDto } from './dtos/new-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.schema';
import RequestWithProducts from './requestWithProd.interface';
import { Subs, SubsDocument } from './subs.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Subs.name)
    private subsModel: Model<SubsDocument>,

    private userService:UserService
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


  async getProjectBySlug(id: ObjectId) {
    const project = await this.productModel.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (project) {
      return project;
    }
    throw new HttpException('Project not found', HttpStatus.FORBIDDEN);
  }


  async subscribe(product: Product, user: User) {
    try{
      const sub = await this.subsModel.create({
        user: user,
        product: product,
      });
      return sub.save();
    }catch(error){
    throw new HttpException('You cannot subscibe',HttpStatus.FORBIDDEN,);}
  }
  

  async unSubscribe(id: ObjectId) {
    try {
      return await this.subsModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }


  async getAllSubs(){
    const result = await this.subsModel.find();
    return result;
  }


}
