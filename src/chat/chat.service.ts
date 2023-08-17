import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatModel } from './schema/chat.schema';
import { Model } from 'mongoose';
import { AllChat, Chat, Messages } from './chat.interface';
import { ConnectionModel } from './schema/chat.connection';

@Injectable()
export class ChatService {

    constructor(@InjectModel("Chat") private chatModel: Model<ChatModel>,
        @InjectModel("Connection") private connectionModel: Model<ConnectionModel>) { }


    async fetchTrainers(id: string): Promise<Messages[]> {
        try {
            const data: Messages[] = await this.chatModel.find({ sender: id })
            if (!data) {
                throw new Error("Could not find")
            }
            const sorted: Messages[] = data.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            return sorted
        } catch (error) {
            console.log(error.message);
            throw new Error(error)
        }
    }

    async fetchUsers(id: string): Promise<Messages[]> {
        try {
            const data: Messages[] = await this.chatModel.find({ sender: id })
            if (!data) {
                throw new Error("Could not find")
            }
            const sorted: Messages[] = data.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            return sorted
        } catch (error) {
            console.log(error.message);
            throw new Error(error)
        }
    }

    async fetchUserConnections(id: string) { 
        try {
            const details = await this.connectionModel.find({
                'connections.user': id,
            }).populate('connections.user').populate('connections.trainer')
            return details
        } catch (error) {
            console.log(error.message);
            throw new Error(error)
        }
    }

    async fetchTrainerConnections(id: string) {
        try {
            const details = await this.connectionModel.find({
                'connections.trainer': id,
            }).populate('connections.user').populate('connections.trainer')
            return details
        } catch (error) {
            console.log(error.message);
            throw new Error(error)
        }
    }

    async createConnection(data: { user: string, trainer: string }): Promise<boolean> {
        try {
            const details = await this.connectionModel.findOne({
                'connections.user': data.user,
                'connections.trainer': data.trainer
            }).populate('connections.user').populate('connections.trainer')
            if (!details) {
                const newConnection = new this.connectionModel({
                    connections: {
                        user: data.user,
                        trainer: data.trainer
                    }
                })
                await newConnection.save()
                const connectionId = newConnection._id.toString()
                const userChat = {
                    connection: connectionId,
                    sender: data.user,
                    reciever: data.trainer
                }
                this.initialUser(userChat)
                const trainerChat = {
                    connection: connectionId,
                    sender: data.trainer,
                    reciever: data.user
                }
                this.initialTrainer(trainerChat)
            }
            return true
        } catch (error) {
            console.log(error.message);
            throw new Error(error)
        }
    }

    async initialUser(data: { connection: string, sender: string, reciever: string }) {
        try {
            const chat = new this.chatModel({
                connection: data.connection,
                sender: data.sender,
                reciever: data.reciever,
                content: ''
            })
            await chat.save()
        } catch (error) {
            console.log(error.message);
        }
    }

    async initialTrainer(data: { connection: string, sender: string, reciever: string }) {
        try {
            const chat = new this.chatModel({
                connection: data.connection,
                sender: data.sender,
                reciever: data.reciever,
                content: ''
            })
            await chat.save()
        } catch (error) {
            console.log(error.message);
        }
    }

    async uploadChat(data: Chat) {
        try {
            let connectionId: string;
            const connection = await this.connectionModel.findOne({
                'connections.user': data.sender,
                'connections.trainer': data.reciever
            })
            if (!connection) {
                const connection = await this.connectionModel.findOne({
                    'connections.user': data.reciever,
                    'connections.trainer': data.sender
                })
                connectionId = connection._id.toString()
            }else{
                connectionId = connection._id.toString()
            }
            const newChat = new this.chatModel({
                connection: connectionId,
                sender: data.sender,
                reciever: data.reciever,
                content: data.content
            })
            await newChat.save()
        } catch (error) {
            console.log(error.message);
            throw new Error(error);
        }
    }

    async getAllChats(details: { trainerId: string, userId: string }): Promise<AllChat[]> {
        try {
            const connection = await this.connectionModel.findOne({
                'connections.user': details.userId,
                'connections.trainer': details.trainerId
            })
            const connectionId = connection._id.toString()
            const data = <AllChat[]>await this.chatModel.find({ connection: connectionId })
            if (!data) {
                throw Error("no messages")
            }
            return data
        } catch (error) {
            console.log(error.message);
            throw new Error(error);
        }
    }

}
