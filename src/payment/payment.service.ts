import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { paymentModel } from './schema/schema';
import mongoose, { Model } from 'mongoose';
import { Payment, PaymentData } from './payment.interface';

@Injectable()
export class PaymentService {

    constructor(@InjectModel("Payments") private paymentModel:Model<paymentModel>){}

    async updatePayment(details: PaymentData): Promise<boolean> {
        try {
          const newPayment = new this.paymentModel ({
            amount: details.stripeToken.amount,
            paidDate: new Date(),
            expiryDate: new Date(),
            secretKey: details.stripeToken.id,
            trainerId: details.trainerId,
            userId: details.userId,
            specialized: details.stripeToken.specialized
          })
          await newPayment.save()
          return true
        } catch (error) {
          console.log();
          throw new Error(error);
        }
      }
}
