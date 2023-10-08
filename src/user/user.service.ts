import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.interface';
import { CreateUserDto } from './model/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async createUser(user: CreateUserDto){
        return this.userRepository.save(user);
    }

    async retrieveAllUsers(): Promise<User[]>{
        return this.userRepository.find();
    }

    async retrieveUserById(id: number): Promise<User>{
        return this.userRepository.findOneBy({id: id});
    }

    async updateUserById(id: number, user: User): Promise<User> {
        await this.userRepository.update(id,user);
        return this.retrieveUserById(id);
    }

    async deleteUserById(id: number): Promise<DeleteResult>{
        return this.userRepository.delete(id);
    }

}
