import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserController} from './user.controller';
// import {Users} from "./index";
import {Users} from "./user.entity";
import {UserService} from './user.service';
import {HRAgent} from "./hrAgent.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users, HRAgent])],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule{ }