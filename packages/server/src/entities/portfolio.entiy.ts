import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Skills } from './skills.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Portfolio {
  @PrimaryColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  contents: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  birth: string;

  @Column()
  @ApiProperty()
  locate: string;

  @Column()
  @ApiProperty()
  graduated: string;

  @Column()
  @ApiProperty()
  eMail: string;

  @OneToMany(() => Skills, (skills) => skills.portfolio)
  @ApiProperty()
  skills: Skills[];

  @Column()
  @ApiProperty()
  gitUrl: string;
}
