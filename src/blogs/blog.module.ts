import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schema/blog.schema';
import { MulterModule } from '@nestjs/platform-express';
import { multerMutipleConfig } from '../helpers/multer/multer.config';
import { UsersSchema } from '../users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Blogs',
      schema: BlogSchema,
      collection: 'blogs'
    },{
      name: 'Users',
      schema: UsersSchema,
      collection: 'users'
    }]),
    MulterModule.register(multerMutipleConfig)
  ],
  providers: [BlogsService],
  controllers: [BlogsController]
})
export class BlogsModule { }
