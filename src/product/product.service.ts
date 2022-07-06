import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateProductDto } from './dtos/new-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.schema';
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {

    }


    
    findallwhere(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }



    
    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec()
    }
    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id)
    }
    async create(productDto: CreateProductDto): Promise<Product>{
        const newProduct = new this.productModel(productDto);
        return newProduct.save();
    }
    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id)
    }

    async update(id: string, productdto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productdto, { new: true })
    }
    // constructor(@InjectModel('Product') private readonly productModel: Model<Product>){
    // }



}
