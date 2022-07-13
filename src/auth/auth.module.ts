import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ProductController } from 'src/product/product.controller';
import { ProductModule } from 'src/product/product.module';
import { ProductrSchema } from 'src/product/product.schema';
import { ProductService } from 'src/product/product.service';
import { SubsSchema } from 'src/product/subs.schema';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { ProductCreatorGuard } from './guards/product-creator.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  // imports: [UserModule, 
  //   JwtModule.registerAsync({useFactory: () => ({
  //   secret: 'secret123',
  //   signOptions: {expiresIn: '30d'}
  // })}),PassportModule.register({session: false,})], //
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    MongooseModule.forFeature([{name: 'Product', schema: ProductrSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Subs', schema: SubsSchema}]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController, ProductController, UserController],
  providers: [AuthService, JwtGuard, JwtStrategy, LocalStrategy, ProductCreatorGuard, ProductService]
})
export class AuthModule {}
