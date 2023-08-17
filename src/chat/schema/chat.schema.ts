import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import mongoose, { Document, Schema as MongooseSchema, ObjectId } from "mongoose";
import { Connection } from "./chat.connection";

export type ChatModel = Chat & Document

@Schema({ collection: 'chats' })
export class Chat {

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Connection' })
    connection: Connection

    @Prop({ type: MongooseSchema.Types.ObjectId })
    sender: ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId })
    reciever: ObjectId

    @Prop()
    content: string

    @Prop({ default: Date.now })
    timestamp: Date
}

export const ChatSchema = SchemaFactory.createForClass(Chat)