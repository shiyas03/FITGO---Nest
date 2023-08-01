import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSchema } from './schema/workouts.schema';
import { multerMutipleConfig } from '../helpers/multer/multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
    MongooseModule.forFeature([{
        name:'Workouts',
        schema: WorkoutSchema,
        collection: 'workouts'
    }]),
    MulterModule.register(multerMutipleConfig)
  ],
  providers: [WorkoutsService],
  controllers: [WorkoutsController]
})
export class WorkoutsModule {}
