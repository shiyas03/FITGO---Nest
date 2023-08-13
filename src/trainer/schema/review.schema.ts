import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from "mongoose";
import { Users } from '../../users/schema/users.schema';

@Schema()
export class ReviewInfo extends Document {
  @Prop()
  review: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' }) 
  userId: Users; 
}

export const ReviewInfoSchema = SchemaFactory.createForClass(ReviewInfo);
