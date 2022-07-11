import { Body, Controller, Delete, Get, Post, Param, Put, UseGuards, HttpException, HttpStatus, Req} from '@nestjs/common';import { JwtGuard } from 'src/auth/guards/jwt.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { NewUSerDTO } from 'src/user/dtos/new-user.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateProductDto } from './dtos/new-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.schema';
import { ProductService } from './product.service';
import RequestWithProducts from './requestWithProd.interface';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('create')
    @UseGuards(JwtGuard)
    async create(@Body() createProductDto: CreateProductDto, @Req() req: RequestWithUser){
        return await this.productService.create(createProductDto, req.user)
    }

    //@UserSchema('user'),

    // @Post('create')
    // @UseGuards(JwtGuard)
    // async add(@Body() NewUserDTO: NewUSerDTO, @Req() req: RequestWithProducts){
    //     return await this.productService.add(NewUserDTO, req.product)
    // }

  
    @Get('allPosts')
    @UseGuards(JwtGuard)
    async getPostsUser(@Req() req : RequestWithUser): Promise<Product[]> {
        return await this.productService.getPostsUser(req) 
    }

    @Get('all')
    @UseGuards(JwtGuard)
    async getAll(): Promise<Product[]> {
        return await this.productService.getAll() 
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Product> {
        return await this.productService.getById(id) 

    }

    // @Get('q')
    // async getPostAuth(@Req() request: RequestWithUser, author: User ){
    
    //     const { user } = request;

    //     if (user._id == )
    //     return this.productService.
        
    // }
    
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Product> {
        return await this.productService.remove(id) 
    }

    @Put(':id')
    async update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
        return await this.productService.update(id, updateProductDto) 
    }

}
