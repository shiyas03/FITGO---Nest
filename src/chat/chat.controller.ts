import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) { }

    @Get('users/:userId')
    async fetchConnections(@Param('userId') userId: string) {
        return await this.chatService.fetchUserConnections(userId)
    }

    @Post('get_all')
    async getAllConnections(@Body() data: string[]) {
        return await this.chatService.getAllConnections(data)
    }

    @Get('trainers/:trainerId')
    async fetchTrainerConnections(@Param('trainerId') trainerId: string) {
        return await this.chatService.fetchTrainerConnections(trainerId)
    }

    @Post('create')
    async createConnections(@Body() connections: { user: string, trainer: string }) {
        return await this.chatService.createConnection(connections)
    }

    @Patch('seen')
    async updateMeesageSeen(@Body() data: { connectionId: string }) {
        return await this.chatService.updateMessageSeen(data.connectionId)
    }

}