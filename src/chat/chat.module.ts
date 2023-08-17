import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatSchema } from './schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionSchema } from './schema/chat.connection';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Chat',
      schema: ChatSchema,
      collection:'chats'
    },{
      name: 'Connection',
      schema: ConnectionSchema,
      collection:'connections'
    }])],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController]
})
export class ChatModule { }
