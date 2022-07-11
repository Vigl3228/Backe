import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { NewUSerDTO } from 'src/user/dtos/new-user.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { CreateProductDto } from './dtos/new-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.schema';
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
    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id)
    }

    async getByAuthor(id: string) {
        return this.productModel.findById(id)
    }
  

    ////
    async remove(id: string) {
        // const q = await this.userM.findOne({ _id: id });
        // if ()
        return this.productModel.findByIdAndRemove(id)
    }
////
    
    async update(id: string, productdto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productdto, { new: true })
    }





}
