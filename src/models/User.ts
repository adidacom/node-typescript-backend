import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';

import { ToDoList } from './ToDoList';

@Entity()
export class User {
  constructor(userdata: User) {
    if (userdata) {
      this.email = userdata.email;
      this.password = userdata.password;
      this.lists = [];
    }
  }

  // Updates static data.
  update(userdata: User) {
    if (userdata.email) this.email = userdata.email;

    if (userdata.password) this.password = userdata.password;
  }

  suspend() {
    this.deleted = true;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('bool', { default: false })
  deleted: boolean;

  @ManyToOne(() => ToDoList, (list) => list.user)
  @JoinTable()
  lists: ToDoList[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
