import { IsNotEmpty, IsString } from "class-validator"

export class UpdateProductDto {
   @IsString()
   @IsNotEmpty()
    readonly title: string
   @IsString()
   @IsNotEmpty()
    readonly text: string
   @IsNotEmpty()
    readonly tags: string
    
    //readonly author:any

}