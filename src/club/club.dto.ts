/* eslint-disable prettier/prettier */
import {  IsString, IsUrl, MaxLength} from 'class-validator';
export class ClubDto {

 @IsString()
 readonly name: string;
 

 @IsString()
 @MaxLength(100, { message: 'description should not exceed 100 characters' })
 readonly description: string;
 
 @IsString()
 readonly birthdate:Date

 @IsUrl()
 readonly image: string;
}