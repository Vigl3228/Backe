import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

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
    id: ObjectId;
}