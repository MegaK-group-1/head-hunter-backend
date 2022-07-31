import { IsEmail, IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { UserRole } from '../../types';

export class ImportUserDto {
  @IsEmail()
  email: string;

  @IsEnum([UserRole.STUDENT])
  role: UserRole.STUDENT;

  @IsNumber()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  courseEngagment: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  projectDegree: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsString()
  bonusProjectUrls: string;
}
