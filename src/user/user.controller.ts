import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ZodValidationPipe } from 'src/util/validationPipe';
import { CreateUserDto, createUserSchema } from './model/user.schema';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    @UsePipes(new ZodValidationPipe(createUserSchema))
    async createUser(@Body() user:CreateUserDto){
       return this.userService.createUser(user); 
    }

    @Get()
    async retrieveAllUsers(): Promise<User[]>{
        return this.userService.retrieveAllUsers();
    }

    @Get(':id')
    async retrieveUserById(
        @Param('id') id: number,
    ): Promise<User>{
        return this.userService.retrieveUserById(id);
    }

    @Put(':id')
    async updateUserById(
        @Param('id') id: number,
        @Body() user:User
    ): Promise<User>{
        return this.userService.updateUserById(id,user);
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id') id: number,
    ): Promise<DeleteResult>{
        return this.userService.deleteUserById(id);
    }
}
