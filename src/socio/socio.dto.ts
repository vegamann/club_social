/* eslint-disable prettier/prettier */
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
export class SocioDto {

 @IsString()
 @IsNotEmpty()
 readonly username: string;
 

 
 @IsString()
 @IsNotEmpty()
 readonly birthdate:Date

 
 @IsNotEmpty()
 @IsEmail()
 readonly email: string;
}