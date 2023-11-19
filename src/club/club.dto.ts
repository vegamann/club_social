/* eslint-disable prettier/prettier */
import {IsDate, IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class ClubDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
 
 @IsDate()
 @IsNotEmpty()
 readonly birthdate:Date

 @IsUrl()
 @IsNotEmpty()
 readonly image: string;
}