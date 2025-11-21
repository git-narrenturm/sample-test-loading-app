import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ type: 'timestamp' })
  created_at: Date;
}
