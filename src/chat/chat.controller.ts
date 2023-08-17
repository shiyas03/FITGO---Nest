import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) { }

    @Post('')
    async getAllChats(@Body() data: { trainerId: string, userId: string }) {
        return this.chatService.getAllChats(data)
    }

    @Get('trainers/:userId')
    async fetchTrainers(@Param('userId') userId: string) {
        return this.chatService.fetchTrainers(userId)
    }

    @Get('connections/:userId')
    async fetchConnections(@Param('userId') userId: string) {
        return this.chatService.fetchUserConnections(userId)
    }

    @Get('all/:trainerId')
    async fetchTrainerConnections(@Param('trainerId') trainerId: string) {
        return this.chatService.fetchTrainerConnections(trainerId)
    }

    @Get('users/:id')
    async fetchUsers(@Param('id') id: string) {
        return this.chatService.fetchUsers(id)
    }

    @Post('create')
    async createConnections(@Body() connections: { user: string, trainer: string }) {
        return this.chatService.createConnection(connections)
    }
    
}