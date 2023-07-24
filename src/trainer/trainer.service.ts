import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainerModel } from './schema/trainer.schema';
import { JwtService } from '@nestjs/jwt';
import { Files, Register, Trainer } from './trainer.interface'
import * as argon from "argon2";

@Injectable()
export class TrainerService {

    constructor(@InjectModel('Trainer') private trainerModel: Model<TrainerModel>, private jwtService: JwtService) { }

    async verifyTrainer(trainer: Trainer): Promise<{ token?: string, error?: string }> {
        try {
            const data = await this.trainerModel.findOne({ email: trainer.email })
            if (data && data.access == true) {
                const verifyPassword = await argon.verify(data.password, trainer.password)
                const paylaod = { sub: data._id, email: data.email }
                const token = await this.jwtService.signAsync(paylaod)
                return verifyPassword ? { token: token } : { error: 'password' }
            }
            return { error: "email" }
        } catch (error) {
            console.log(error);
            // return { error }
        }
    }

    async register(details: Register): Promise<{ email?: boolean, id?: string }> {
        try {
            const data = await this.trainerModel.findOne({ email: details.email })
            if (data && data.isUpload) {
                return { email: true }
            } else {
                const hashPassowrd = await argon.hash(details.password);
                const newTrianer = new this.trainerModel({
                    name: details.name,
                    email: details.email,
                    password: hashPassowrd
                })
                await newTrianer.save();
                return { id: newTrianer._id }
            }
        } catch (error) {
            console.log(error);
            // return { error }
        }
    }

    async detailsUpload(about: string, cv: Files, certificates: Files[], id: string): Promise<{ success: boolean, email?: string }> {
        try {
            let documents = certificates.map((data) => data.filename)
            const data = await this.trainerModel.findOneAndUpdate({ _id: id },
                {
                    $set: {
                        about: about,
                        cv: cv.filename,
                        certificate: documents,
                        isUpload: true
                    }
                })
            if (data) {
                return { success: true, email: data.email }
            } else {
                return { success: false }
            }
        }
        catch (error) {
            console.log(error)
            // return { error }
        }
    }
}
