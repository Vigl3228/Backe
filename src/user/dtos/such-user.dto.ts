import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ExistingUSerDTO {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;

}
