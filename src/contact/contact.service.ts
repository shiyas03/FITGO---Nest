import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { contactModel } from './contact.schema';
import { Model } from 'mongoose';
import { contact } from './contact.interface';

@Injectable()
export class ContactService {
    constructor(@InjectModel("Contacts") private contactModel: Model<contactModel>) { }

    async contactMessage(data: contact): Promise<boolean> {
        try {
            const newContact = new this.contactModel({
                first_name: data.fname,
                last_name: data.sname,
                email: data.email,
                message: data.message
            })
            await newContact.save()
            return true
        } catch (error) {
            console.log(error.message);
            throw new Error(error)
        }
    }
}
