import { ApiProperty } from '@nestjs/swagger';

export class AuthRemindPwdDto {
  @ApiProperty()
  email: string;
}
