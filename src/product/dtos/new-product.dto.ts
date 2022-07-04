import { IsNotEmpty, IsString } from "class-validator"

export class CreateProductDto {

   // @IsString()
    //@IsNotEmpty()
    readonly title: string
    //@IsString()
   // @IsNotEmpty()
    readonly text: string
   // @IsNotEmpty()
    readonly tags: string[]

}