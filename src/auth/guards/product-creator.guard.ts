
import { CanActivate, ExecutionContext, Injectable, mixin, Type } from "@nestjs/common";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";
import RequestWithUser from "../requestWithUser.interface";
import Role from "./role.enum";


@Injectable()
export class ProductCreatorGuard implements CanActivate {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) { }
  async canActivate(context: ExecutionContext) {   
    const request = context.switchToHttp().getRequest()

    const {user, params} = request;

    const productId = Object(params.id)
    const productChecked = await this.productService.getById(productId)
    

    if (!user || !params) return false

    if (user?.role.includes(Role.Admin)) return true
    
    const userId = user._id
    const userChecked = await this.userService.getById(userId)
    
    //console.log(userChecked._id,productChecked.author._id )

    return userChecked._id.toString() === productChecked.author._id.toString(); 
  }
}
