import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NewUSerDTO {
    //@IsString()
   // @IsNotEmpty()
    fullName:string;
    //@IsString()
    //@IsNotEmpty()
    //@IsEmail()
    email:string;
    //@IsString()
    //@IsNotEmpty()
    password:string;
    
}
