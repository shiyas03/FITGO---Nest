import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from "mongoose";
import { Workout } from 'src/workouts/workouts.interface';

@Schema()
export class WorkInfo extends Document {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Workout" })
    workouts: Workout

    @Prop()
    date: Date
}

export const WorkInfoSchema = SchemaFactory.createForClass(WorkInfo);
