import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ClubDto } from './club.dto';
import { ClubEntity } from './club.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('club')
export class ClubController {
  constructor(private readonly clubservice: ClubService) {}

  @Get()
  async findAll() {
    return await this.clubservice.findAll();
  }

  @Get(':cubId')
  async findOne(@Param('cubId') cubId: string) {
    return await this.clubservice.findOne(cubId);
  }

  @Post()
  async create(@Body() clubDto: ClubDto) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
    return await this.clubservice.create(club);
  }

  @Put(':cubId')
  async update(@Param('cubId') cubId: string, @Body() clubDto: ClubDto) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
    return await this.clubservice.update(cubId, club);
  }

  @Delete(':cubId')
  @HttpCode(204)
  async delete(@Param('cubId') cubId: string) {
    return await this.clubservice.delete(cubId);
  }
}
