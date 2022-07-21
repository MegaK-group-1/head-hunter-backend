import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Users} from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) {}

    async getUsers(): Promise<Users[]> {
        return await this.userRepository.find();
    }

    async findOneUser(id: string): Promise<Users> {
        return await this.userRepository.findOneBy({id});
    }

    // async updateUser(user: Users) {
    //     await this.userRepository.save(user);
    // }

    async deleteUser(user: Users) {
        await this.userRepository.delete(user);
    }

    async createUser(user: any): Promise<Users> {
        // return this.userRepository.save(user);
        // const {username, password, emailAddress} = user;
        // const user = new Users();
        try {
            user.username = 'konik';
            user.password = 'jjksf';
            user.emailAddress = 'konie@konin.pl';
            return await this.userRepository.save(user);
        } catch (e) {
            console.log(e);
        }
    }
}