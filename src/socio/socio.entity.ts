import { ClubEntity } from 'src/club/club.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class SocioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  birthdate: Date;
  @ManyToMany(() => ClubEntity, club => club.socios)
   clubs: ClubEntity[];
}
∫