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
        return await this.userRepository.find({});
    }



    // async findOneUser(id: number): Promise<User> {
    //     return await this.userRepository.findOne(id);
    // }

    // async updateUser(user: User) {
    //     await this.userRepository.save(user);
    // }

    // async deleteUser(user: User) {
    //     await this.userRepository.delete(user);
    // }

    async createUser(user: any): Promise<Users> {
        // return this.userRepository.save(user);
        // const {username, password, emailAddress} = user;
        // const user = new Users();
        try {
            user.username = 'testowa';
            user.password = '5555';
            user.emailAddress = 'test@test.pl';
            return await this.userRepository.save(user);
        } catch (e) {
            console.log('And the Eroor goes to...:', e);
        }

    }
}