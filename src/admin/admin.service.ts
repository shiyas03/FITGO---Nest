import { Injectable } from '@nestjs/common';
import { Admin, Trainers, Users } from './admin.interface';
import { InjectModel } from '@nestjs/mongoose';
import { AdminModel } from './schema/admin.schema';
import { Model } from 'mongoose';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { userDocument } from '../users/schema/users.schema';
import { TrainerModel } from '../trainer/schema/trainer.schema';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as handlebars from 'handlebars';


@Injectable()
export class AdminService {

    constructor(@InjectModel('Admin') private adminModel: Model<AdminModel>,
        private jwtService: JwtService,
        @InjectModel('Users') private userModel: Model<userDocument>,
        @InjectModel('Trainers') private trainerModel: Model<TrainerModel>,
        private readonly mailService: MailerService,
    ) { }

    async verifyAdmin(adminData: Admin): Promise<{ token?: string, error?: string }> {
        try {
            const data = await this.adminModel.findOne({ email: adminData.email })
            if (data) {
                const verifyPassword = await argon.verify(data.password, adminData.password);
                const payload = { sub: data._id, email: data.email }
                const token = await this.jwtService.signAsync(payload)
                return verifyPassword ? { token: token } : { error: "password" };
            }
            return { error: "email" }
        } catch (error) {
            console.log(error)
            // return { error }
        }
    }

    async fetchUsers(): Promise<Users[]> {
        try {
            const datas: Users[] = await this.userModel.find({}, { name: 1, email: 1, access: 1 })
            return datas
        } catch (error) {
            console.log(error);
            return [error]
        }
    }

    async updateUserAccess(details: { id: string, access: boolean }): Promise<{ success: boolean }> {
        try {
            const data = await this.userModel.findByIdAndUpdate({ _id: details.id }, { $set: { access: details.access } })
            if (data) {
                return { success: true }
            } else {
                return { success: false }
            }
        } catch (error) {
            console.log(error);
            // return { error }
        }
    }

    async fetchTrainers(): Promise<Trainers[]> {
        try {
            const data = <Trainers[]>await this.trainerModel.find({})
            if (data) {
                return data
            }
        } catch (error) {
            console.log(error);

        }
    }

    async approveTrainer(details: { id: string, approve: boolean }): Promise<{ success: boolean }> {
        try {
            const data = await this.trainerModel.findOneAndUpdate({ _id: details.id }, {
                $set: {
                    approve: true,
                    access: true,
                    joinDate: Date.now()
                }
            })
            if (data) {
                let template: HandlebarsTemplateDelegate<{ name: string }>;
                const templatePath = 'src/helpers/mail-templates/approve-template.hbs';
                const templateContent = fs.readFileSync(templatePath, 'utf8');
                template = handlebars.compile(templateContent);

                const htmlContent = template({ name: data.name });
                this.mailService.sendMail({
                    to: <string>data.email,
                    from: 'ffitgo@gmail.com',
                    subject: 'otp for authentication',
                    text: 'Hello Welcome!',
                    html: htmlContent
                })
                return { success: true }
            } else {
                return { success: false }
            }
        } catch (error) {

        }
    }

    async updateTrainerAccess(details: { id: string, access: boolean }): Promise<{ success: boolean }> {
        try {
            const data = await this.trainerModel.findOneAndUpdate({ _id: details.id }, {
                $set: {
                    access: details.access
                }
            })
            if (data) {
                return { success: true }
            } else {
                return { success: false }
            }
        } catch (error) {
            console.log(error);

        }
    }
} 