import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Trainer } from "../../trainer/schema/trainer.schema";

export type BlogModel = Document & Blog

@Schema({ collection: 'blogs' })
export class Blog {
    @Prop()
    title: string

    @Prop()
    category: string

    @Prop()
    blog: string

    @Prop()
    template: string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Trainer' })
    trainerId: Trainer

    @Prop({ default: false })
    approve: boolean

    @Prop()
    publishedDate : Date
}

export const BlogSchema = SchemaFactory.createForClass(Blog)