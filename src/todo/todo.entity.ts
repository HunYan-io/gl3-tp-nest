import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from './todo-status.enum';
import { DatableEntity } from 'src/common/datable.entity';

@Entity({ name: 'todos' })
export class TodoEntity extends DatableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column()
  description: string;

  @Column({
    enum: TodoStatusEnum,
    type: 'enum',
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum;
}
