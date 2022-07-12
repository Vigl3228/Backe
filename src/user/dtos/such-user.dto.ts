import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ExistingUSerDTO {
    [x: string]: any
    //@IsString()
    //@IsNotEmpty()
    email:string;
    //@IsString()
    //@IsNotEmpty()
    password:string;
    //@IsString()
    //@IsNotEmpty()
    id: number;
}