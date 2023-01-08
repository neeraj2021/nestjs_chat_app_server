import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MyBaseEntity } from '../myBase.entity';

@Entity()
export class User extends MyBaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'Id',
  })
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    name: 'Name',
  })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    name: 'Email',
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    name: 'Password',
  })
  password: string;
}
