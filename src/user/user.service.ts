// где происходят все пользовательские данные
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Module from 'module';
import { Model, ObjectId } from 'mongoose';
import { UserDetails } from './user.interface';
import { UserModule } from './user.module';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
 
  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getById(id: ObjectId) {
    const user = await this.userModel.findOne({ _id: id });

    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  // getById(userId: any) {
  //     throw new Error('Method not implemented.');
  // }
  async findOne(arg0: { id: any }) { 



    throw new Error('Method not implemented.');
  }

  // _getUserDetails(user: UserDocument): UserDetails {
  //     return {
  //         id: user._id,
  //         name: user.name,
  //         email: user.email,
  //     }
  // }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(
    name: string,
    email: string,
    hashedPasswrod: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPasswrod,
    }); //передаем новую модель пользователя(в которой передаем ...)
    return await newUser.save();
  }

  async findById(id: ObjectId) {
    return await this.userModel.findOne({}).exec();
  }

  async findAllProducts() {
    return this.userModel.find().populate('product');
  }
}
