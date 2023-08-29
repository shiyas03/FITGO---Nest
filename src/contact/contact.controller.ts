import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { contact } from './contact.interface';

@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) { }

    @Post('')
    async contactMessage(@Body() data: contact) {
        return await this.contactService.contactMessage(data)
    }
}
