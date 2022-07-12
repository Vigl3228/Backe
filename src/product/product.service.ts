import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose'
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { NewUSerDTO } from 'src/user/dtos/new-user.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { CreateProductDto } from './dtos/new-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.schema';
import RequestWithProducts from './requestWithProd.interface';
@Injectable()
export class ProductService {
    find() {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<ProductDocument>,
        @InjectModel(User.name)
        private userModel: Model<UserDocument>) {

    }

    async create(productDto: CreateProductDto, author: User){
        const newProduct = new this.productModel({
            ...productDto,
            author,
    });
        return newProduct.save();
    }
    
    // async add(userDto: NewUSerDTO, products: Product){
    //     const newPost = new this.userModel({
    //         ...userDto,
    //         products
    //     })
    //     return newPost.save();
            
    // }
    async getById(id: ObjectId): Promise<Product> {
        return this.productModel.findById(id)
    }

    async getByAuthor(id: ObjectId) {
        return this.productModel.findById(id)
    }
    findOne(arg0: { id: any }) {
        throw new Error('Method not implemented.');
      }





    
    findallwhere(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }

    async getPostsUser(req: RequestWithUser): Promise<Product[]> {
        const result = await this.productModel.find({author: req.user})
        return result

    }


    async getAll(): Promise<Product[]> {
        const result = await this.productModel.find()
        return result
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
        
        return this.productModel.findByIdAndRemove(id)
    }
    
    async update(id: ObjectId, productdto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productdto, { new: true })
    }

}
