import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AdminModel = Document & Admin

@Schema({ collection: 'admins' })
export class Admin {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)