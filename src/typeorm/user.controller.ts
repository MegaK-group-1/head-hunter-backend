import {Body, Controller, Get, HttpStatus, Param, Post, Redirect, Res, Headers} from "@nestjs/common";
import {Users} from "./user.entity";
import {UserService} from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Get('one')
    // myFirstAction() {
    //     return '<h1>Hello everybody!</h1>';
    // }



    // @Post()
    // async createUser(@Res() response, @Body() user: Users) {
    //     const newUser = await this.userService.createUser(user);
    //     return response.status(HttpStatus.CREATED).json({newUser})
    // }
    // @Post()
    // createUser(@Body() user: Users) {
    //     // const id = `${Math.floor(Math.random() * 1000)}`;
    //     const newUser = this.userService.createUser({
    //         id: 10,
    //         username: 'kanarek',
    //         password: '3333',
    //         emailAddress: 'kanarek@kanar.pl',
    //     });
    //     console.log(newUser);
    // }

    // @Get()
    // async fetchAll(@Res() response) {
    //     const users = await this.userService.getUsers();
    //     console.log(users);
    //     // return response.status(HttpStatus.OK).json({users});
    //     return response.status(HttpStatus.OK).json(users);
    // }
    // @Get()
    // async getUsers(): Promise<Users[]> {
    //     const userList = await this.userService.getUsers();
    //     console.log(userList);
    //     return userList;
    // }
    @Get('/')
    async getUsers(): Promise<Users[]> {
        return this.userService.getUsers();
    }



    // @Get('/:id')
    // async findById(@Res() response, @Param('id') id) {
    //     const user = await this.userService.findOneUser(id);
    //     return response.status(HttpStatus.OK).json({user})
    // }


    // @Put()
    // update(@Body() user: User) {
    //     return this.userService.updateUser(user);
    // }
    //
    // @Delete(':id')
    // deleteUser(@Param() params) {
    //     return this.userService.deleteUser(params.id);
    // }

}