import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Users } from "../../users/schema/users.schema";
import { Trainer } from "../../trainer/schema/trainer.schema";

export type ConnectionModel = Connection & Document


@Schema({ collection: 'connection' })
export class Connection {

    @Prop({
        type: {
            user: { type: mongoose.Types.ObjectId, ref: 'Users' },
            trainer: { type: mongoose.Types.ObjectId, ref: 'Trainer' },
        },
    })
    connections: {
        user: Users;
        trainer: Trainer;
    };

    @Prop({ default: Date.now })
    timestamp: Date;

}

export const ConnectionSchema = SchemaFactory.createForClass(Connection)