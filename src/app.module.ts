import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import entities, {Users} from "./typeorm";
import {UserModule} from './typeorm/user.module';

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
