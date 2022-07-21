import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import entities, {Users} from "./User";
import {UserModule} from './User/user.module';
import {UserController} from "./User/user.controller";
import {UserService} from "./User/user.service";

@Module({
    imports: [
        TypeOrmModule.forRoot(
            {
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'head_hunter',
                entities,
                bigNumberStrings: false,
                logging: true,
                synchronize: true,
            }
        ),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
