import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.interface';


@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) { }

    @Post('login')
    async adminLogin(@Body() adminData: Admin) {
        return this.adminService.verifyAdmin(adminData)
    }

    @Get('users')
    async fetchUsers() {
        return this.adminService.fetchUsers()
    }

    @Patch('user-access')
    async updateUserAccess(@Body() details: { id: string, access: boolean }){
        return this.adminService.updateUserAccess(details)
    }

    @Get('trainers')
    async fetchTrainers() {
        return this.adminService.fetchTrainers()
    }

    @Patch('trainer-approve')
    async approveTrainer(@Body() details: { id: string, approve: boolean }) {
        return this.adminService.approveTrainer(details)
    }

    @Patch('trainer-access')
    async updateTrainerAccess(@Body() details: { id: string, access: boolean }) {
        return this.adminService.updateTrainerAccess(details)
    }
}
