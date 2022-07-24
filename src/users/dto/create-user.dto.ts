import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { userRole } from '../../types/user';

export class CreateUserAdminDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
  role: userRole;
}

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  tel: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  githubUsername: string;

  @IsString()
  @IsOptional()
  portfolioUrls: string;

  @IsString()
  @IsNotEmpty()
  projectUrls: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsNotEmpty()
  expectedTypeWork: string;

  @IsString()
  @IsOptional()
  targetWorkCity: string;

  @IsString()
  @IsNotEmpty()
  expectedContractType: string;

  @IsString()
  @IsOptional()
  expectedSalary: string;

  @IsString()
  @IsNotEmpty()
  canTakeApprenticeship: string;

  @IsString()
  @IsNotEmpty()
  monthsOfCommercialExp: string;

  @IsString()
  @IsOptional()
  education: string;

  @IsString()
  @IsOptional()
  workExperience: string;

  @IsString()
  @IsOptional()
  courses: string;
}

export class CreateUserHrDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  maxReservedStudents: string;
}
