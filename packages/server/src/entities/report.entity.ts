import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  reason: string;

  @Column()
  @ApiProperty()
  guestBookId: number;

  @Column({ default: false })
  @ApiProperty()
  isReviewed: boolean = false;
}
