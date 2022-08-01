import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose'
import {IUser} from './interfaces/user.interface'


@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>){}

  
  public async create(createUserDto: CreateUserDto) {
    const user = await new this.userModel(createUserDto);
    return user.save();
  }

  public async findAll() {
    const users = await this.userModel.find().exec();
    if(!users || !users[0]){
      throw new HttpException('Not Found',404);
    }
    return users;
  }

  public async findOne(id: number) {
    const user = await this.userModel.findOne({id}).exec();
    if(!user){
      throw new HttpException('Not Found',404);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
  
  }

  public async remove(id: number) {
    const user = await this.userModel.deleteOne({id}).exec();
    if(user.deletedCount === 0){
      throw new HttpException('Not Found',404);
    }
    return user;
  }
}
