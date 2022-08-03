import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  githubUserName?: string;

  @ApiProperty({ required: false, type: Number })
  phone?: number;
}
