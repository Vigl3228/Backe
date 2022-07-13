import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
 
  async validate(payload: TokenPayload) {
   //console.log(payload)
    return this.userService.getById(payload.userId);
  }
}
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserService } from 'src/user/user.service';
// import { AuthService } from '../auth.service';
 


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private readonly configService: AuthService,
//         private readonly userService: UserService){
        
//         super({
//             jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
//                 return request.cookies.Authentication;
//             }]),
//             secretOrKey: configService.get('secret123')
//             //ignoreExpiration: false,
//             //secretOrKey: 'secret123'

//         })
//     }

//     async validate(payload: TokenPayload){ //полезная нагрузка
//         //return {...payload.user};
//         return this.userService.getById(payload.userId);
//     }

// }
