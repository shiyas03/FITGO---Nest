import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { paymentModel } from './schema/schema';
import mongoose, { Model, trusted } from 'mongoose';
import { Payment, PaymentData, PaymentDetails } from './payment.interface';
import Stripe from 'stripe';
import { TrainerModel } from 'src/trainer/schema/trainer.schema';

@Injectable()
export class PaymentService {

  private readonly stripe
  constructor(@InjectModel("Payments") private paymentModel: Model<paymentModel>, @InjectModel("Trainer") private trainerModel: Model<TrainerModel>,) {
    this.stripe = new Stripe("sk_test_51NaG9bSJ8tM5mOcsqEmQol0W0hRvzVcV3OaPiAkTfb2u2TPSZp83l4hx3SgOAVplhxWck3DQLf5dbw0LDccKG6mS00EtQwsUrE", {
      apiVersion: '2022-11-15',
      appInfo: {
        name: "fitgo-fitness",
        version: "0.0.1",
      }
    })
  }

  async payment(data: Payment): Promise<{ id: string, url: string }> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: data.packageId,
            quantity: 1
          },
        ],
        metadata: {
          amount: data.amount,
          userId: data.userId,
          trainerId: data.trainerId,
          packageId: data.packageId
        },
        success_url: `${'http://localhost:4200'}/trainers/view?session_id={CHECKOUT_SESSION_ID}&trainer_id=${data.trainerId}`,
        cancel_url: `${'http://localhost:4200'}/trainers/view?&trainer_id=${data.trainerId}`,
        // automatic_tax: { enabled: true }
      });
      return session
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }

  async paymentStatus(session_id: string): Promise<boolean> {
    try {
      if (session_id) {
        const checkoutSession = await this.stripe.checkout.sessions.retrieve(session_id)
        const { amount, userId, trainerId, packageId } = checkoutSession.metadata;
        const period = <number>amount < 600 ? 30 : amount > 7000 ? 360 : 180
        const currentDate = new Date()
        const newDate = currentDate.setDate(currentDate.getDate() + period)
        const newPayment = new this.paymentModel({
          amount: amount,
          userId: userId,
          trainerId: trainerId,
          packageId: packageId,
          paidDate: new Date,
          expiryDate: newDate,
          sessionId: session_id,
          user_status: checkoutSession.status,
          trainer_status: false,
        })
        if (checkoutSession.status === 'complete') {
          await newPayment.save()
          return true
        } else {
          return false
        }
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }

  async fetchPayments(userId: string): Promise<PaymentDetails[]> {
    try {
      if (userId) {
        const objectId = new mongoose.Types.ObjectId(userId)
        const data = <PaymentDetails[]>(await this.paymentModel.find({ userId: objectId }).populate('userId').populate('trainerId'))
        if (data) {
          const sortedData = data.sort((a, b) => b.expiryDate.getTime() - a.expiryDate.getTime());
          return sortedData
        } else {
          throw new Error("Couldn't find payments")
        }
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }

  async fetchAllPayments(): Promise<PaymentDetails[]> {
    try {
      const data = <PaymentDetails[]>(await this.paymentModel.find().populate('userId').populate('trainerId'))
      if (data) {
        const sortedData = data.sort((a, b) => b.expiryDate.getTime() - a.expiryDate.getTime());
        return sortedData
      } else {
        throw new Error("Couldn't find payments")
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }

  async fetchTrainerPayments(trainerId: string): Promise<PaymentDetails[]> {
    try {
      if (trainerId) {
        const objectId = new mongoose.Types.ObjectId(trainerId)
        const data = <PaymentDetails[]>(await this.paymentModel.find({ trainerId: objectId }).populate('userId').populate('trainerId'))
        if (data) {
          const sortedData = data.sort((a, b) => b.expiryDate.getTime() - a.expiryDate.getTime());
          return sortedData
        } else {
          throw new Error("Couldn't find payments")
        }
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }

  async payToTrainer(trainerId: string): Promise<boolean> {
    try {
      const data = await this.paymentModel.findOneAndUpdate({ trainerId: trainerId }, {
        $set: {
          trainer_status: true
        }
      });
      if (data) {
        const newAmount = Math.abs(data.amount * 0.7)
        const details = {
          date: new Date(),
          amount: newAmount
        }
        await this.trainerModel.updateOne({ _id: trainerId }, {
          $push: { payments: details }
        }, { new: true })
        return true
      }
      return false
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }

}
