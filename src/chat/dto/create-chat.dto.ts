import { IsNotEmpty, IsString } from "class-validator"

export class CreateChatDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string

}