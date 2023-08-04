import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchema } from './schema/schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:'Payments',
      schema: paymentSchema,
      collection:'payments'
    }])
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
