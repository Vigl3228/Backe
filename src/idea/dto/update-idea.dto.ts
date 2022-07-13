import { IsNotEmpty, IsString } from "class-validator"

export class UpdateIdeaDto {
   @IsString()
   @IsNotEmpty()
    readonly title: string
   @IsString()
   @IsNotEmpty()
    readonly text: string


}