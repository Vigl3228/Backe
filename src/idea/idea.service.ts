import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from 'src/product/product.schema';
import RequestWithProducts from 'src/product/requestWithProd.interface';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Idea, IdeaDocument } from './idea.schema';

@Injectable()
export class IdeaService {
  constructor(
    @InjectModel(Idea.name)
    private ideaModel: Model<IdeaDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(ideaDto: CreateIdeaDto, product: Product) {
    try {
      const newIdea = new this.ideaModel({
        ...ideaDto,
        product,
      });

      return newIdea.save();
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
  async getById(id: ObjectId): Promise<Idea> {
    try {
      return await this.ideaModel.findById(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async getPostsUser(req: RequestWithProducts): Promise<Idea[]> {
    const result = await this.ideaModel.find({ product: req.product });
    return result;
  }

  async getAll(): Promise<Idea[]> {
    const result = await this.ideaModel.find();
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
      return await this.ideaModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: ObjectId, ideadto: UpdateIdeaDto): Promise<Idea> {
    try {
      return await this.ideaModel.findByIdAndUpdate(id, ideadto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
