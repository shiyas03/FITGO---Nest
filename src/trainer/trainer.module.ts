import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerSchema } from './schema/trainer.schema';
import { MulterModule } from '@nestjs/platform-express';
import { multerMutipleConfig } from '../helpers/multer/multer.config';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:'Trainer',
      schema: TrainerSchema,
      collection: 'trainers'
    }]),
    MulterModule.register(multerMutipleConfig),
  ],
  providers: [TrainerService],
  controllers: [TrainerController]
})

export class TrainerModule {}