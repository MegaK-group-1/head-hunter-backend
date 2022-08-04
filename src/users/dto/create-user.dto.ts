import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAdminDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullName: string;
}

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tel: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  githubUsername: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  portfolioUrls: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  projectUrls: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  expectedTypeWork: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  targetWorkCity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  expectedContractType: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  expectedSalary: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  canTakeApprenticeship: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  monthsOfCommercialExp: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  education: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  workExperience: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  courses: string;
}

export class CreateUserHrDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

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
