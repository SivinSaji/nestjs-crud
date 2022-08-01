import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {AdminSchema} from './schemas/admin.schema'

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Admin',
        schema:AdminSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}

