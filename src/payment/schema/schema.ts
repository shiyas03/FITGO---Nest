import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Users } from '../../users/schema/users.schema'
import { Trainer } from "../../trainer/schema/trainer.schema";

export type paymentModel = Payment & Document;

@Schema({ collection: "payments" })
export class Payment {

    @Prop()
    amount: number;

    @Prop()
    paidDate: Date;

    @Prop()
    expiryDate: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
    userId: Users;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Trainer" })
    trainerId: Trainer;

    @Prop()
    packageId:string;

    @Prop()
    sessionId:string;

    @Prop()
    status:string;
}

export const paymentSchema = SchemaFactory.createForClass(Payment);
