import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserDetails } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}

    @Get(':id')
    @UseGuards(JwtGuard)
    getUser(@Param('id') id: string) {
        return this.UserService.findById(id) 
    }
    @Get()
    @UseGuards(JwtGuard)
    getAll() {
        return this.UserService.getAll()
    }
}
