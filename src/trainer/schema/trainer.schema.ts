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
    password: string

    @Prop()
    about: string

    @Prop()
    cv: string

    @Prop()
    certificate: string[]

    @Prop({ type: Boolean, default: false })
    isUpload: boolean

    @Prop({ type: Boolean, default: false })
    approve:boolean

    @Prop({ type: Boolean, default: false })
    access: boolean

    @Prop()
    joinDate : Date
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);