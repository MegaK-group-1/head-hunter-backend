import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { studentStatus, userRole } from '../../types/users/user';
import { UserDetails } from './user.details.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, (entity) => entity.hr, { onDelete: 'SET NULL' })
  student: User[] | null;

  @ManyToOne(() => User, (entity) => entity.student)
  hr: User | null;

  @OneToOne(() => UserDetails, (entity) => entity.user)
  userDetails: UserDetails | null;

  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 72 })
  password: string;

  @Column({
    nullable: true,
    default: null,
  })
  company: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  registerToken: string | null;

  @Column({
    type: 'enum',
    default: 'student',
    enum: userRole,
  })
  role: userRole;

  @Column({
    nullable: true,
    default: null,
  })
  @Column({
    nullable: true,
    default: null,
  })
  status: studentStatus | null;

  @Column({
    nullable: true,
    default: null,
    type: 'tinyint',
    unsigned: true,
  })
  maxReservedStudents: number | null;
}
