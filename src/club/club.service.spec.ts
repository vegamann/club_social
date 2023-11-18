import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { Repository } from 'typeorm';
import { ClubEntity } from './club.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ClubService', () => {
  let service: ClubService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<ClubEntity>;
  let clubesList: ClubEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<ClubEntity>>(
      getRepositoryToken(ClubEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    clubesList = [];
    for (let i = 0; i < 5; i++) {
      const club: ClubEntity = await repository.save({
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
        birthdate: faker.date.anytime(),
        image: faker.animal.dog(),
      });
      clubesList.push(club);
    }
  };
  it('findAll should return all clubes', async () => {
    const club: ClubEntity[] = await service.findAll();
    expect(club).not.toBeNull();
    expect(club).toHaveLength(clubesList.length);
  });
  it('findOne should return a club by id', async () => {
    const storedClub: ClubEntity = clubesList[0];
    const club: ClubEntity = await service.findOne(storedClub.id);
    expect(club).not.toBeNull();
    expect(club.name).toEqual(storedClub.name);
    expect(club.description).toEqual(storedClub.description);
    expect(club.birthdate).toEqual(storedClub.birthdate);
    expect(club.image).toEqual(storedClub.image);
  });

  it('create should return a new museum', async () => {
    const club: ClubEntity = {
      id: '',
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      birthdate: faker.date.anytime(),
      image: faker.image.imageUrl(),
      socios: [],
    };

    const newclub: ClubEntity = await service.create(club);
    expect(newclub).not.toBeNull();

    const storedclub: ClubEntity = await repository.findOne({
      where: { id: newclub.id },
    });
    expect(storedclub).not.toBeNull();
    expect(storedclub.name).toEqual(newclub.name);
    expect(storedclub.description).toEqual(newclub.description);
    expect(storedclub.image).toEqual(newclub.image);
  });

  it('update should modify a club', async () => {
    const club: ClubEntity = clubesList[0];
    club.name = 'New name';

    const updatedclub: ClubEntity = await service.update(club.id, club);
    expect(updatedclub).not.toBeNull();

    const storedclub: ClubEntity = await repository.findOne({
      where: { id: club.id },
    });
    expect(storedclub).not.toBeNull();
    expect(storedclub.name).toEqual(club.name);
  });

  it('delete should remove a club', async () => {
    const club: ClubEntity = clubesList[0];
    await service.delete(club.id);

    const deletedclub: ClubEntity = await repository.findOne({
      where: { id: club.id },
    });
    expect(deletedclub).toBeNull();
  });
});
