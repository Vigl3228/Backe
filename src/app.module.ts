import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';



@Module({
  imports: [MongooseModule.forRoot(`mongodb://localhost:27017/users`, { useNewUrlParser: true }), UserModule, AuthModule, ProductModule,

  ConfigModule.forRoot({
    validationSchema: Joi.object({
      //...
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
    })
  })
  ],
  controllers: [AppController],
  providers: [AppService],

})

export class AppModule { }
