import { Test, TestingModule } from '@nestjs/testing';
import { ClubesSociosService } from './clubes-socios.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClubEntity } from '../club/club.entity';
import { SocioEntity } from '../socio/socio.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ClubesSociosService', () => {
  let service: ClubesSociosService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let clubRepository: Repository<ClubEntity>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let socioRepository: Repository<SocioEntity>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let club: ClubEntity;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let socioList: SocioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubesSociosService],
    }).compile();

    service = module.get<ClubesSociosService>(ClubesSociosService);
    clubRepository = module.get<Repository<ClubEntity>>(
      getRepositoryToken(ClubEntity),
    );
    socioRepository = module.get<Repository<SocioEntity>>(
      getRepositoryToken(SocioEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    socioRepository.clear();
    clubRepository.clear();

    socioList = [];
    for (let i = 0; i < 5; i++) {
      const socio: SocioEntity = await socioRepository.save({
        username: faker.company.name(),
        birthdate: faker.date.anytime(),
        email: faker.internet.email(),
      });
      socioList.push(socio);
    }

    club = await clubRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      birthdate: faker.date.anytime(),
      image: faker.image.imageUrl(),
      socios: socioList,
    });
  };

  it('addScioClub should add an socio to a cluub', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      username: faker.company.name(),
      birthdate: faker.date.anytime(),
      email: faker.internet.email(),
    });

    const newClub: ClubEntity = await clubRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      birthdate: faker.date.anytime(),
      image: faker.image.imageUrl(),
    });

    const result: ClubEntity = await service.addMemberClub(
      newClub.id,
      newSocio.id,
    );

    expect(result.socios.length).toBe(1);
    expect(result.socios[0]).not.toBeNull();
    expect(result.socios[0].username).toBe(newSocio.username);
    expect(result.socios[0].birthdate).toStrictEqual(newSocio.birthdate);
    expect(result.socios[0].email).toBe(newSocio.email);
  });

  it('findMemberFromClub should return socio by club', async () => {
    const socio: SocioEntity = socioList[0];
    const storedSocio: SocioEntity = await service.findMemberFromClub(
      club.id,
      socio.id,
    );
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.username).toBe(socio.username);
    expect(storedSocio.birthdate).toStrictEqual(socio.birthdate);
    expect(storedSocio.email).toBe(socio.email);
  });

  it('findMembersFromClub should return socios by club', async () => {
    const socios: SocioEntity[] = await service.findMembersFromClub(club.id);
    expect(socios.length).toBe(5);
  });

  it('updateMembersFromClub should update artworks list for a museum', async () => {
    const newSocio: SocioEntity = await socioRepository.save({
      username: faker.company.name(),
      birthdate: faker.date.anytime(),
      email: faker.internet.email(),
    });

    const updatedClub: ClubEntity = await service.updateMembersFromClub(
      club.id,
      [newSocio],
    );
    expect(updatedClub.socios.length).toBe(1);
    expect(updatedClub.socios[0].username).toBe(newSocio.username);
    expect(updatedClub.socios[0].birthdate).toBe(newSocio.birthdate);
    expect(updatedClub.socios[0].email).toBe(newSocio.email);
  });

  it('deleteMemberFromClub should remove an socio from a club', async () => {
    const socio: SocioEntity = socioList[0];

    await service.deleteMemberFromClub(club.id, socio.id);

    const storedClub: ClubEntity = await clubRepository.findOne({
      where: { id: club.id },
      relations: ['socios'],
    });
    const deletedSocio: SocioEntity = storedClub.socios.find(
      (a) => a.id === socio.id,
    );
 
    expect(deletedSocio).toBeUndefined();
 
  });
});
