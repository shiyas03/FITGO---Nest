import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class paymentInfo extends Document {
  @Prop()
  amount:number

  @Prop() 
  date:Date
}

export const paymentInfoSchema = SchemaFactory.createForClass(paymentInfo);
