import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserDetails } from './entities/user.details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetails])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
