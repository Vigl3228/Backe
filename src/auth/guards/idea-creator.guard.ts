
import { CanActivate, ExecutionContext, Injectable, mixin, Type } from "@nestjs/common";
import { IdeaService } from "src/idea/idea.service";
import { ProductService } from "src/product/product.service";
import Role from "./role.enum";


@Injectable()
export class IdeaCreatorGuard implements CanActivate {
  constructor(
    private readonly ideaService: IdeaService,
    private readonly productService: ProductService,
  ) { }
  async canActivate(context: ExecutionContext) {   
    const request = context.switchToHttp().getRequest()

    const {prod, idea} = request; //юсер и прод

    const ideaId = Object(idea.id)
    const ideaChecked = await this.ideaService.getById(ideaId)
    

    if (!prod || !idea) return false

    //if (prod?.role.includes(Role.Admin)) return true
    
    const prodId = prod._id
    const prodChecked = await this.productService.getById(prodId)
    
    //console.log(prodChecked._id,productChecked.author._id )
    return prodChecked._id.toString() === ideaChecked.product._id.toString(); 

  }
}
