import { IsNotEmpty, IsString } from "class-validator"

export class CreateIdeaDto {


   @IsString()
    @IsNotEmpty()
    readonly title: string
    @IsString()
   @IsNotEmpty()
    readonly text: string

}