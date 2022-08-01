import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('login')
  adminLogin(@Body('email') email: string, @Body('password') password: string) {
    if (email && password)
      return this.adminService.adminLogin({ email, password })
    else
      return { message: 'User details not  found.' }
  }

  @Post('addUser')
  create(@Body() createAdminDto: CreateAdminDto) {
    createAdminDto.admin = "No"
    return this.adminService.createUser(createAdminDto);
  }

  @Post('userLogin')
  userLogin(@Body('email') email: string, @Body('password') password: string) {
    if (email && password)
      return this.adminService.userLogin({ email, password })
    else
      return { message: 'User details not found.' }
  }


  @Post('editProfile')
  update(@Body() createAdminDto) {
    return this.adminService.update(createAdminDto);
  }

  @Get('allUsers')
  findAll() {
    return this.adminService.findAll();
  }


  /*
  
  upload(@UploadedFile() File:Express.Multer.File) {
      
    console.log("service");
  
  
  }*/
}
