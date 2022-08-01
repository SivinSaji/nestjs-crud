import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { IAdmin } from './interfaces/admin.interface'
import * as bcrypt from "bcrypt";
import { read, utils } from 'xlsx';
import * as jwt from "jsonwebtoken"


@Injectable()
export class AdminService {


  constructor(@InjectModel('Admin') private readonly adminModel: Model<IAdmin>) { }

  generateToken(id: string) {
    return jwt.sign({ id }, "nest-sample-jwt", { expiresIn: "30d" })
  }

  adminLogin(adminData: any) {
    return new Promise(async (resolve, reject) => {
      let admin: any = await this.adminModel.findOne({ email: adminData.email })

      if (admin.password == adminData.password && admin.admin == 'yes') {
        admin = {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          token: this.generateToken(admin._id)
        }

        resolve(admin)
      }
      else
        resolve({ message: 'Invalid email or password.' })
    })
  }

  public async createUser(createAdminDto: CreateAdminDto) {
    let userExist: any = await this.adminModel.findOne({ email: createAdminDto.email })
    if (userExist) {
      return { message: 'EmailID allready used' }
    } else {
      const user = await new this.adminModel(createAdminDto);
      return user.save();
    }


  }

  userLogin(userData: any) {
    return new Promise(async (resolve, reject) => {
      let user: any = await this.adminModel.findOne({ email: userData.email })

      if (user.password == userData.password && user.admin == 'No') {
        user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: this.generateToken(user._id)
        }

        resolve(user)
      }
      else
        resolve({ message: 'Invalid email or password.' })
    })
  }

  update(updateUser) {
    return new Promise(async (resolve, reject) => {
      let user: any = await this.adminModel.findOneAndUpdate({ _id: updateUser._id }, { email: updateUser.email })
      if (user) {
        resolve({ message: user.email + ' updated' })
      }
      else {
        resolve({ message: 'There is no user with this id' })
      }
    })
  }

  public async findAll() {
    const admins = await this.adminModel.find().exec();
    if (!admins || !admins[0]) {
      throw new HttpException('Not Found', 404);
    }
    return admins;
  }


  /*
  public upload(file:Express.Multer.File){
    console.log("ooooooo");
    const workbook=read(file.buffer.buffer,{type:'buffer'});
    const sheet = Object.keys(workbook.Sheets).map((name)=>({
      name,
      data: utils.sheet_to_json(workbook.Sheets).map((name)=>({
       
  
      }))
    }))
  
    
  console.log(workbook);
  
    }
  
  */
}
