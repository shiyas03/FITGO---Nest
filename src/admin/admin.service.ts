import { Injectable } from '@nestjs/common';
import { Admin, Users } from './admin.interface';
import { InjectModel } from '@nestjs/mongoose';
import { AdminModel } from './schema/admin.schema';
import { Model } from 'mongoose';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { userDocument } from '../users/schema/users.schema';

@Injectable()
export class AdminService {

    constructor(@InjectModel('Admin') private adminModel: Model<AdminModel>,
        private jwtService: JwtService,
        @InjectModel('Users') private userModel: Model<userDocument>,
    ) { }

    async verifyAdmin(adminData: Admin): Promise<{ token?: string, message?: string }> {
        try {
            const data = await this.adminModel.findOne({ email: adminData.email })
            if (data) {
                const verifyPassword = await argon.verify(data.password, adminData.password);
                const payload = { id: data._id, email: data.email }
                const token = await this.jwtService.signAsync(payload)
                return verifyPassword ? { token: token } : { message: "Incorrect Password" };
            }
            return { message: "Email not found" }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async fetchUsers(): Promise<Users[]> {
        try {
            const datas: Users[] = await this.userModel.find({}, { name: 1, email: 1, access: 1, imageUrl : 1 })
            return datas
        } catch (error) {
            console.log(error);
            throw new Error(error);
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
            throw new Error(error);
        }
    }

    
} 