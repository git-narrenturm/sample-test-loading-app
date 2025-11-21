import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('item')
@Index('name')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ type: 'timestamp' })
  created_at: Date;
}
