import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { multerMutipleConfig } from '.././helpers/multer/multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Users',
      schema: UsersSchema,
      collection: 'users'
    }]),
    MulterModule.register(multerMutipleConfig),
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
