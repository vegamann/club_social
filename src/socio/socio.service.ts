import { Injectable } from '@nestjs/common';
import { SocioEntity } from './socio.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(SocioEntity)
    private readonly clubRepository: Repository<SocioEntity>,
  ) {}
}
