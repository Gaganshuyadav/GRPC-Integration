import { AUTH, USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit{
  constructor( @Inject(AUTH) private client: ClientGrpc){ }

  private usersService: UsersServiceClient;

  onModuleInit() {
    this.usersService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  
  create( createUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll() {
    return this.usersService.findAllUsers({});
  }

  findOne(id: string) {
    return this.usersService.findOneUser({ id});
  }

  update(id: string, updateUserDto) {
    return  this.usersService.updateUser(updateUserDto);
  }

  remove(id: string) {
    return this.usersService.removeUser({ id});
  }
}
