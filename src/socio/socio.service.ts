import { Injectable } from '@nestjs/common';
import { SocioEntity } from './socio.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(SocioEntity)
    private readonly socioRepository: Repository<SocioEntity>,
  ) {}
  async findAll(): Promise<SocioEntity[]> {
    return await this.socioRepository.find({ relations: ['clubes'] });
  }
  async findOne(id: string): Promise<SocioEntity> {
    const socio: SocioEntity = await this.socioRepository.findOne({
      where: { id },
      relations: ['clubes'],
    });
    if (!socio)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return socio;
  }
  async create(socio: SocioEntity): Promise<SocioEntity> {
    return await this.socioRepository.save(socio);
  }
  async update(id: string, socio: SocioEntity): Promise<SocioEntity> {
    const persistedClub: SocioEntity = await this.socioRepository.findOne({
      where: { id },
    });
    if (!persistedClub)
      // eslint-disable-next-line prettier/prettier
      throw new BusinessLogicException("The socio with the given id was not found", BusinessError.NOT_FOUND);
    // eslint-disable-next-line prettier/prettier
    return await this.socioRepository.save({...persistedClub, ...socio});
  }
  async delete(id: string) {
    const socio: SocioEntity = await this.socioRepository.findOne({
      where: { id },
    });
    if (!socio)
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.socioRepository.remove(socio);
  }
}
