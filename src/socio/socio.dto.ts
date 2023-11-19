/* eslint-disable prettier/prettier */
import {IsDate, IsEmail, IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class SocioDto {

 @IsString()
 @IsNotEmpty()
 readonly username: string;
 

 
 @IsDate()
 @IsNotEmpty()
 readonly birthdate:Date

 @IsUrl()
 @IsNotEmpty()
 @IsEmail()
 readonly email: string;
}