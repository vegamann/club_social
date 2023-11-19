import { Test, TestingModule } from '@nestjs/testing';
import { SocioService } from './socio.service';
import { SocioEntity } from './socio.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('SocioService', () => {
  let service: SocioService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<SocioEntity>;
  let sociosList: SocioEntity[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SocioService],
    }).compile();

    service = module.get<SocioService>(SocioService);
    repository = module.get<Repository<SocioEntity>>(
      getRepositoryToken(SocioEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    sociosList = [];
    for (let i = 0; i < 5; i++) {
      const socio: SocioEntity = await repository.save({
        username: faker.company.name(),
        birthdate: faker.date.anytime(),
        email: faker.internet.email(),
      });
      sociosList.push(socio);
    }
  };
  it('findAll should return all socios', async () => {
    const socios: SocioEntity[] = await service.findAll();
    expect(socios).not.toBeNull();
    expect(socios).toHaveLength(sociosList.length);
  });

  it('findOne should return a socio by id', async () => {
    const storedsocio: SocioEntity = sociosList[0];
    const socio: SocioEntity = await service.findOne(storedsocio.id);
    expect(socio).not.toBeNull();
    expect(socio.username).toEqual(storedsocio.username);
    expect(socio.birthdate).toEqual(storedsocio.birthdate);
  });

  it('create should return a new socio', async () => {
    const socio: SocioEntity = {
      id: '',
      username: faker.company.name(),
      birthdate: faker.date.anytime(),
      email: faker.internet.email(),
      clubes: [],
    };

    const newsocio: SocioEntity = await service.create(socio);
    expect(newsocio).not.toBeNull();

    const storedsocio: SocioEntity = await repository.findOne({
      where: { id: newsocio.id },
    });
    expect(storedsocio).not.toBeNull();
    expect(storedsocio.username).toEqual(newsocio.username);
    expect(storedsocio.birthdate).toEqual(newsocio.birthdate);
  });

  it('update should modify a socio', async () => {
    const socio: SocioEntity = sociosList[0];
    socio.username = 'New name';

    const updatedsocio: SocioEntity = await service.update(socio.id, socio);
    expect(updatedsocio).not.toBeNull();

    const storedsocio: SocioEntity = await repository.findOne({
      where: { id: socio.id },
    });
    expect(storedsocio).not.toBeNull();
    expect(storedsocio.username).toEqual(socio.username);
    
  });
  
  it('delete should remove a socio', async () => {
    const socio: SocioEntity = sociosList[0];
    await service.delete(socio.id);

    const deletedsocio: SocioEntity = await repository.findOne({
      where: { id: socio.id },
    });
    expect(deletedsocio).toBeNull();
  });

  it('delete should throw an exception for an invalid socio', async () => {
    const socio: SocioEntity = sociosList[0];
    await service.delete(socio.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The socio with the given id was not found',
    );
  });
});
