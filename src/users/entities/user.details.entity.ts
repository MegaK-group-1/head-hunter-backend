import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExpectedContractType, ExpectedTypeWork } from '../../types/users/user';
import { User } from './user.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (entity) => entity.userDetails, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  courseCompletion: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  courseEngagment: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  projectDegree: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  teamProjectDegree: number;

  @Column({
    nullable: true,
    default: null,
  })
  bonusProjectUrls: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  portfolioUrls: string | null;

  @Column({
    nullable: true,
    default: null,
    unsigned: true,
  })
  phone: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  bio: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ExpectedTypeWork,
    default: ExpectedTypeWork.NO_MATTER,
  })
  expectedTypeWork: ExpectedTypeWork;

  @Column({
    nullable: true,
    default: null,
  })
  targetWorkCity: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ExpectedContractType,
    default: ExpectedContractType.NO_MATTER,
  })
  expectedContractType: ExpectedContractType;

  @Column({
    nullable: true,
    default: null,
  })
  githubUsername: string | null;

  @Column({
    nullable: true,
    default: null,
    type: 'float',
    precision: 8,
    scale: 2,
  })
  expectedSalary: number | null;

  @Column({
    nullable: true,
    default: 0,
  })
  canTakeApprenticeship: number;

  @Column({
    nullable: true,
    default: 0,
  })
  monthsOfCommercialExp: number;

  @Column({
    nullable: true,
    default: null,
  })
  education: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  workExperience: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  courses: string | null;
}
