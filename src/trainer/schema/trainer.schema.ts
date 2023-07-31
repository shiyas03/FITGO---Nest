import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TrainerModel = Document & Trainer

@Schema({ collection: 'trainers' })
export class Trainer {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    phone: number

    @Prop()
    password: string

    @Prop()
    experience: number

    @Prop()
    specialized: string

    @Prop()
    about: string

    @Prop()
    cv: string

    @Prop()
    certificate: string[]

    @Prop()
    imageUrl: string

    @Prop({ type: Boolean, default: false })
    isUpload: boolean

    @Prop({ type: Boolean, default: false })
    approve: boolean

    @Prop({ type: Boolean, default: false })
    access: boolean

    @Prop()
    joinDate: Date
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);