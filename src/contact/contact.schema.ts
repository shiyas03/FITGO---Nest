import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type contactModel = Contact & Document;

@Schema({ collection: "payments" })
export class Contact {

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    email: string

    @Prop()
    message: string
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
