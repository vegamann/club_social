import { Injectable } from '@nestjs/common';
import { ClubEntity } from './club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}
  async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find({ relations: ['socios'] });
  }
  async findOne(id: string): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
      relations: ['socios'],
    });
    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return club;
  }
  async create(club: ClubEntity): Promise<ClubEntity> {
    return await this.clubRepository.save(club);
  }
  async update(id: string, club: ClubEntity): Promise<ClubEntity> {
    const persistedClub: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });
    if (!persistedClub)
      // eslint-disable-next-line prettier/prettier
      throw new BusinessLogicException("The socio with the given id was not found", BusinessError.NOT_FOUND);
    // eslint-disable-next-line prettier/prettier
    return await this.clubRepository.save({...persistedClub, ...club});
  }
  async delete(id: string) {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });
    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.clubRepository.remove(club);
  }
}
