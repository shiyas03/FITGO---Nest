import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type userDocument = Users & Document;

@Schema({ collection: "users" })
export class Users {
  
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  goal: string;

  @Prop()
  goalWeight: number;

  @Prop()
  months: number;

  @Prop()
  gender: string;

  @Prop()
  activity: string;

  @Prop()
  caloriesBurn: number;

  @Prop()
  caloriesNeed: number;

  @Prop({ default: false })
  isUpload: boolean;

  @Prop()
  imageUrl: string;

  @Prop({ type: { amount: { type: Number }, paidDate: { type: Date } } })
  fee: {
    amount: number;
    paidDate: Date;
  };

  @Prop()
  feedback: string;

  @Prop({ type: Boolean, default: false })
  access: Boolean;

  @Prop({ default: Date.now })
  joinDate: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
