import {Body, Controller, Get, HttpStatus, Param, Post, Redirect, Res, Headers, Delete} from "@nestjs/common";
import {Users} from "./user.entity";
import {UserService} from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Post()
    // async createUser(@Res() response, @Body() user: Users) {
    //     const newUser = await this.userService.createUser(user);
    //     return response.status(HttpStatus.CREATED).json({newUser})
    // // }
    // @Post('create')
    // createUser(@Body() user: Users) {
    //     const newUser = this.userService.createUser({
    //         id: 10,
    //         username: 'kanarek',
    //         password: '3333',
    //         emailAddress: 'kanarek@kanar.pl',
    //     });
    // }
    @Post('create')
    async createUser(@Res() response, @Body() user: Users) {
        const newUser = await this.userService.createUser(user);
        return response.status(HttpStatus.CREATED).json({newUser})
    }

    @Get('/')
    async getUsers(@Res() response): Promise<Users[]> {
        const users = await this.userService.getUsers();
        return response.status(HttpStatus.OK).json(users);
    }


    @Get(':id')
    async findOneUser(@Res() response, @Param('id') id) {
        const user = await this.userService.findOneUser(id);
        return response.status(HttpStatus.OK).json({user});
    }

    // @Put()
    // update(@Body() user: User) {
    //     return this.userService.updateUser(user);
    // }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.deleteUser(params.id);
    }

}