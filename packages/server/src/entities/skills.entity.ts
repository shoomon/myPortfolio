import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from './portfolio.entiy';
import { Part } from './part.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  imageUrl: string = '';

  @Column()
  @ApiProperty()
  imageWidth: number = 0;

  @Column()
  @ApiProperty()
  imageHeight: number = 0;

  @Column({ type: 'enum', enum: Part, default: Part.Tools })
  @ApiProperty()
  part: Part;

  @Column()
  @ApiProperty()
  index: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.skills)
  @ApiProperty()
  portfolio: Portfolio;
}
