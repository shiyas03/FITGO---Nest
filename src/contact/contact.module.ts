import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Contacts',
      schema: ContactSchema,
      collection: 'contacts'
    }])
  ],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule { }
