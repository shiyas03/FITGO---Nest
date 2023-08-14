import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchema } from './schema/schema';
import { TrainerSchema } from '../trainer/schema/trainer.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:'Payments',
      schema: paymentSchema,
      collection:'payments'
    },{
      name:'Trainer',
      schema: TrainerSchema,
      collection: 'trainers'
    }])
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
