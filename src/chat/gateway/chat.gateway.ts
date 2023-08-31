import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { Chat } from '../chat.interface';
import { ChatService } from '../chat.service';
import * as dotenv from 'dotenv'
dotenv.config()
const port = process.env.FRONT_END_API

@WebSocketGateway({ cors: { origin: [port] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private chatService: ChatService) { }

  @WebSocketServer()
  server: Server;

  handleConnection(client: string, ...args: string[]) {
    console.log("connection received");
  }

  handleDisconnect(client: string) {
    console.log('disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: Chat) {
    this.server.emit('newMessage', data)
    this.chatService.uploadChat(data)
  }
}
