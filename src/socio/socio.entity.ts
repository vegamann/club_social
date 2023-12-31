import { ClubEntity } from '../club/club.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class SocioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  birthdate: Date;
  @Column()
  email: string;
  // eslint-disable-next-line prettier/prettier
  @ManyToMany(() => ClubEntity, club => club.socios)
  clubes: ClubEntity[];
}
