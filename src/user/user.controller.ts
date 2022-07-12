import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserDetails } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}

    @Get(':id')
    @UseGuards(JwtGuard)
    async getUser(@Param('id') id: ObjectId) {
        return await this.UserService.findById(id) 
    }
    @Get()
    @UseGuards(JwtGuard)
    async getAll() {
        return await this.UserService.getAll()
    }

    @Get('allposts')
    async getAllPosts(
    ) {
      return await this.UserService.findAllProducts();
    }
  
}
