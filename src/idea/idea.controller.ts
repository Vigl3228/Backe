import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ProductCreatorGuard } from 'src/auth/guards/product-creator.guard';
import Role from 'src/auth/guards/role.enum';
import { LocalAuthenticationGuard } from 'src/auth/localAuthentication.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import RequestWithProducts from 'src/product/requestWithProd.interface';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Idea } from './idea.schema';
import { IdeaService } from './idea.service';


@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post('create')
  async create(
    @Body() createIdeaDto: CreateIdeaDto,
    @Req() req: RequestWithProducts,
  ) {
    return await this.ideaService.create(createIdeaDto, req.product);
  }


  @Get('allPost')
  async getPostsUser(@Req() req: RequestWithProducts) {
    return await this.ideaService.getPostsUser(req);
  }

  @Get('all')
  async getAll(): Promise<Idea[]> {
    return await this.ideaService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: ObjectId): Promise<Idea> {
    return await this.ideaService.getById(id);
  }

  

  @Delete('delete/:id')
 // @UseGuards(RoleGuard(Role.Admin))
 
  async remove(@Req() req : RequestWithProducts, @Param('id') id: ObjectId) {
     
      return await this.ideaService.remove(id);
  }

  @Put('update/:id')
  async update(
    @Body() updateIdeaDto: UpdateIdeaDto,
    @Param('id') id: ObjectId,
  ): Promise<Idea> {
    return await this.ideaService.update(id, updateIdeaDto);
  }


}
