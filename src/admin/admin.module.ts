import {  Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schema/admin.schema';
import { UsersSchema } from '../users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Admin',
      schema: AdminSchema,
      collection: 'admins'
    }, {
      name: 'Users',
      schema: UsersSchema,
      collection: 'users'
    }]),
    
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}