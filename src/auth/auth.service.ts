import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';
import { NewUSerDTO } from 'src/user/dtos/new-user.dto';
import { ExistingUSerDTO } from 'src/user/dtos/such-user.dto';
import { UserDetails } from 'src/user/user.interface';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);

      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );

      if (!isPasswordMatching) {
        throw new HttpException(
          'Passwords is not matching',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getCookieWithJwtToken(userId: ObjectId) {
    const payload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  get(arg0: string) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: { id: ObjectId; data: any }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {} //создание пользовательской службы

  async hashPassword(
    password: string,
  ): //функция хеширования которая принимает пароль
  Promise<string> {
    //возвращаем другую строку
    return bcrypt.hash(password, 12);
  }

  async login(existingUser: ExistingUSerDTO): Promise<{ token: string }> {
    //требуется авторизированный юзер
    const { email, password } = existingUser; //получение почты и пароля юзера
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }

  async register(user: Readonly<NewUSerDTO>): Promise<User> {
    const { fullName, email, password } = user;
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new HttpException('Email Taken!', HttpStatus.FORBIDDEN);
    }

    const hashedPasswrod = await this.hashPassword(password);
    const newUser = await this.usersService.create(
      fullName,
      email,
      hashedPasswrod,
    );
    return newUser; // получение данных
  }

  async doesPasswordMatch(
    password: string,
    hashedPasswrod: string,
  ): Promise<boolean> {
    //сравнение
    return bcrypt.compare(password, hashedPasswrod);
  }
  //проверка на совпадение данных
  async validateUser(email: string, password: string) {
    //возвращаем данные пользователя
    const user = await this.usersService.findByEmail(email);
    const doesUserExist = !!user; //

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) return null;
    return user;
  }
}
