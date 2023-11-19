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
import { ClubesSociosService } from './clubes-socios.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { SocioDto } from 'src/socio/socio.dto';
import { SocioEntity } from 'src/socio/socio.entity';
import { plainToInstance } from 'class-transformer';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubesSociosController {
  constructor(private readonly clubesSociosService: ClubesSociosService) {}

  @Post(':clubId/members/:memberId')
  async addArtworkMuseum(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubesSociosService.addMemberClub(clubId, memberId);
  }
  @Get(':clubId/members/:memberId')
  async findMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubesSociosService.findMemberFromClub(clubId, memberId);
  }
  @Get(':clubId/members')
  async findMembersFromClub(@Param('clubId') clubId: string) {
    return await this.clubesSociosService.findMembersFromClub(clubId);
  }
  @Put(':clubId/members')
  async updateMembersFromClub(
    @Body() socioDto: SocioDto[],
    @Param('clubId') clubId: string,
  ) {
    const socios = plainToInstance(SocioEntity, socioDto);
    return await this.clubesSociosService.updateMembersFromClub(clubId, socios);
  }

  @Delete(':clubId/members/:memberId')
  @HttpCode(204)
  async deleteMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubesSociosService.deleteMemberFromClub(
      clubId,
      memberId,
    );
  }
}
