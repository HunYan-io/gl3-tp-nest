import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DatableEntity {
  @CreateDateColumn({ update: false })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
