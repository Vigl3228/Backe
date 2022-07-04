// import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
// import { NewUSerDTO } from 'src/user/dtos/new-user.dto';
// import { ExistingUSerDTO } from 'src/user/dtos/such-user.dto';
// import { UserDetails } from 'src/user/user.interface';
// import { AuthService } from './auth.service';
// import { Request, Response } from 'express';
// import { JwtService } from '@nestjs/jwt';

import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDetails } from 'src/user/user.interface';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { NewUSerDTO } from 'src/user/dtos/new-user.dto';
import { ExistingUSerDTO } from 'src/user/dtos/such-user.dto';
import RequestWithUser from './requestWithUser.interface';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';






@Controller('auth')
export class AuthController {
    JwtService: any;
    constructor(private authService: AuthService, private jwtService: JwtService) { }

    // @UseGuards(LocalAuthenticationGuard)
    @Post('register')
    async register(@Body() user: NewUSerDTO) { //оидание пользователя | вернет данные пользователя 
        console.log(user);
        return await this.authService.register(user); //регистрация контректного пользователя
    }


    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Req() request: RequestWithUser,
        @Res({ passthrough: true }) response: Response
    ) { //оидание пользователя | вернет данные пользователя 

        const { user } = request;

        const cookie = await this.authService.getCookieWithJwtToken(user._id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return user;

    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @Get('profile')
    @UseGuards(JwtGuard)
    getprofile(@Req() request: RequestWithUser){
        const {user} = request;
        return{
            ...user,
            password: undefined
        };
    }
   
}
