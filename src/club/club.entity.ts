import { SocioEntity } from 'src/socio/socio.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  birthdate: Date;
  @Column()
  image: string;
  // eslint-disable-next-line prettier/prettier
  @ManyToMany(() => SocioEntity, socio => socio.clubs)
  socios: SocioEntity[];
}
