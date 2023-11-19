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
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { SocioService } from './socio.service';
import { plainToInstance } from 'class-transformer';
import { SocioEntity } from './socio.entity';
import { SocioDto } from './socio.dto';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('socio')
export class SocioController {
  constructor(private readonly socioservice: SocioService) {}

  @Get()
  async findAll() {
    return await this.socioservice.findAll();
  }

  @Get(':socioId')
  async findOne(@Param('socioId') socioId: string) {
    return await this.socioservice.findOne(socioId);
  }

  @Post()
  async create(@Body() socioDto: SocioDto) {
    const socio: SocioEntity = plainToInstance(SocioEntity, socioDto);
    return await this.socioservice.create(socio);
  }

  @Put(':socioId')
  async update(@Param('socioId') socioId: string, @Body() socioDto: SocioDto) {
    const socio: SocioEntity = plainToInstance(SocioEntity, socioDto);
    return await this.socioservice.update(socioId, socio);
  }

  @Delete(':socioId')
  @HttpCode(204)
  async delete(@Param('socioId') socioId: string) {
    return await this.socioservice.delete(socioId);
  }
}
