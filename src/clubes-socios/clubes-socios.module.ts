import { Module } from '@nestjs/common';
import { ClubesSociosService } from './clubes-socios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from 'src/club/club.entity';
import { SocioEntity } from 'src/socio/socio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, SocioEntity])],
  providers: [ClubesSociosService],
})
export class ClubesSociosModule {}
