import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { Trainer } from "../../trainer/schema/trainer.schema";

export type userDocument = Users & Document;

@Schema({ collection: "users" })
export class Users extends mongoose.Document {

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

  @Prop()
  feedback: string;

  @Prop({ type: Boolean, default: false })
  access: Boolean;

  @Prop({ default: Date.now })
  joinDate: Date;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
