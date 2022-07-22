import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [{id:1,name:"Sivin",place:"Kallumpuram"}]
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto); 
    this.users.push(createUserDto)
    return 'A new user '+createUserDto.name+ ' added';
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user=>user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
  let objIndex = this.users.findIndex((obj => obj.id === id));
  this.users[objIndex]= updateUserDto
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
