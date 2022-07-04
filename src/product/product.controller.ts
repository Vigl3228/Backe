import { Body, Controller, Delete, Get, Post, Param, Put, UseGuards, HttpException, HttpStatus} from '@nestjs/common';import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateProductDto } from './dtos/new-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    //@UseGuards(JwtGuard)
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto)
    }

    //@UserSchema('user'),

    
    @Get()
    @UseGuards(JwtGuard)
    getAll(): Promise<Product[]> {
        return this.productService.getAll() 
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Product> {
        return this.productService.getById(id) 

    }

    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Product> {
        return this.productService.remove(id) 
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
        return this.productService.update(id, updateProductDto) 
    }

}
