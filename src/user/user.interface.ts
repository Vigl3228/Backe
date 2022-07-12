import { ObjectId } from "mongoose";

export interface UserDetails{
    id: ObjectId;
    name: string;
    email: string;
}