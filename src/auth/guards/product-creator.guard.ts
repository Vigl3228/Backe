
import { CanActivate, ExecutionContext, Injectable, mixin, Type } from "@nestjs/common";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";
import Role from "./role.enum";


@Injectable()
export class ProductCreatorGuard implements CanActivate {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) { }
  async canActivate(context: ExecutionContext) {
    const {user, params} = context.switchToHttp().getRequest();
    if (!user || !params) return false
    if (user?.roles.includes(Role.Admin)) return true
    const userId = user._id
    const productId = Number(params._id)
        
    const userChecked = await this.userService.getById(userId)
    const productChecked = await this.productService.getById(productId)
    return userChecked._id === productChecked._id; 
  }
}
// impo