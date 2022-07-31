import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole, UserStatus } from '../../types';
import { UserDetails } from './user.details.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, (entity) => entity.hr, { onDelete: 'SET NULL' })
  student: User[] | null;

  @ManyToOne(() => User, (entity) => entity.student)
  hr: User | null;

  @OneToOne(() => UserDetails, (entity) => entity.user, { eager: true })
  userDetails: UserDetails | null;

  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Column({ length: 50, nullable: true, default: null })
  firstName: string | null;

  @Column({ length: 50, nullable: true, default: null })
  lastName: string | null;

  @Column({ length: 150, nullable: true, default: null })
  password: string | null;

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
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  status: UserStatus;

  @Column({
    nullable: true,
    default: null,
    type: 'tinyint',
    unsigned: true,
  })
  maxReservedStudents: number | null;
}
