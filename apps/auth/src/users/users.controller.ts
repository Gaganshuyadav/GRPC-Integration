import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersServiceController, UsersServiceControllerMethods, CreateUserDto, FindOneUserDto, User, UpdateUserDto } from '@app/common';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  // @MessagePattern('createUser')
  createUser(CreateUserDto: CreateUserDto):User {
    return this.usersService.create(CreateUserDto);
  }

  // @MessagePattern('findAllUsers')
  findAllUsers() {
    return this.usersService.findAll();
  }

  // @MessagePattern('findOneUser')
  findOneUser(findOneUserDto:FindOneUserDto) {
    return this.usersService.findOne( findOneUserDto.id);
  }

  // @MessagePattern('updateUser')
  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  // @MessagePattern('removeUser')
  removeUser( findUserDto: FindOneUserDto) {
    return this.usersService.remove( findUserDto.id);
  }
}
