import { Injectable, OnModuleInit } from '@nestjs/common';
import { User, Users, CreateUserDto, UpdateUserDto  } from '@app/common';
import { randomUUID} from 'crypto';

@Injectable()
export class UsersService implements OnModuleInit {

  private readonly usersList:Array<User> = [];

  onModuleInit() {
      for(let i=0; i<100; i++){
        this.create({ username: `User-${randomUUID()}`, password: `password-${Math.floor(Math.random()*10000)}`, age: Math.floor(Math.random()*200)});
      }
  }


  create(createUserDto: CreateUserDto):User {
    // return 'This action adds a new user';

    const newUser:User = {
        id: randomUUID(),
        ...createUserDto,
        subscribed: false,
        socialMedia: {
          fbUrl: "fb.link",
        }
      };

    this.usersList.push(newUser);

    return newUser;
  }

  findAll():Users {
    // return `This action returns all users`;
    return { users: this.usersList};

  }

  findOne(id: string) {
    return this.usersList.filter((user)=>user.id===id)[0];
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    
    const findIdx = this.usersList.findIndex(user=>user.id===id);

    if( findIdx!==-1){
      this.usersList[findIdx] = {
        ...this.usersList[findIdx],
        ...updateUserDto
      }
    }
    else{
      throw new Error(`User Not found by Id: ${id}`)
    }

    return this.usersList[findIdx];
  }

  remove(id: string) {

    const findIdx = this.usersList.findIndex(user=>user.id===id);

    const findUser = this.usersList.filter(user=>user.id===id);

    if( findIdx!==-1){
      this.usersList.slice( findIdx, 1);

      return findUser[0];
    }
    else{
      throw new Error(`User Not found by Id: ${id}`)
    }

  }
}
