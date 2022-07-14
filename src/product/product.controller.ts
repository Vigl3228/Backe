import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ProductCreatorGuard } from 'src/auth/guards/product-creator.guard';
import Role from 'src/auth/guards/role.enum';
import { LocalAuthenticationGuard } from 'src/auth/localAuthentication.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { CreateProductDto } from './dtos/new-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.schema';
import { ProductService } from './product.service';
import { Subs } from './subs.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.productService.create(createProductDto, req.user);
  }

  //@UserSchema('user'),

  // @Post('create')
  // @UseGuards(JwtGuard)
  // async add(@Body() NewUserDTO: NewUSerDTO, @Req() req: RequestWithProducts){
  //     return await this.productService.add(NewUserDTO, req.product)
  // }

  @Get('allPost')
  @UseGuards(JwtGuard)
  async getPostsUser(@Req() req: RequestWithUser) {
    return await this.productService.getPostsUser(req);
  }

  @Get('all')
  @UseGuards(JwtGuard)
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: ObjectId): Promise<Product> {
    return await this.productService.getById(id);
  }


  @UseGuards(JwtGuard)
  @Post('subscribe/:id')
  async subscribe(@Req() req: RequestWithUser, @Param() param) {
    const product = await this.productService.getById(param.id);
    return await this.productService.subscribe(product, req.user);
  }
  @UseGuards(JwtGuard)
  @Get('getSubscribe/:id')
  async getAllSubscribers( @Param() param) {
    const product = await this.productService.getById(param.id);
    return await this.productService.getAllSubs(product._id);
  }
  //когда происходит подписка в массив продукта добавлялись подписанные пользователи

  @UseGuards(JwtGuard)
  @Delete('unsubscribe/:id')
  async unSubscribe(@Param() param) {
    return await this.productService.unSubscribe(param.id);
  }


  @Delete('delete/:id')
  @UseGuards(JwtGuard, ProductCreatorGuard)
 // @UseGuards(RoleGuard(Role.Admin))
 
  async remove(@Req() req : RequestWithUser, @Param('id') id: ObjectId) {
     
      return await this.productService.remove(id);
  }

  @Put('update/:id')
  @UseGuards(JwtGuard, ProductCreatorGuard)
  async update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: ObjectId,
  ): Promise<Product> {
    return await this.productService.update(id, updateProductDto);
  }

  @Get('allS')
  @UseGuards(JwtGuard)
  async getAllSub(){
    return await this.productService.getAll();
  }


  @Get('allPost')
  @UseGuards(JwtGuard)
  async getPostsUsers(@Req() req: RequestWithUser) {
    return await this.productService.getPostsUser(req);
  }

}
