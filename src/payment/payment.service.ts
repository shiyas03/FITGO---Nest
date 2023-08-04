import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { paymentModel } from './schema/schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {

    constructor(@InjectModel("Payments") private paymentModel:Model<paymentModel>){}
}
