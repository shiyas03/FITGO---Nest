import { Body, Controller, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
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
    
}
