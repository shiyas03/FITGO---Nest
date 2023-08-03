import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "./schema/users.schema";
import { Login, PaymentData, UpdateDetails, UserDetails } from "./user.interface";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("register")
  async registerUser(@Body() user: Users) {
    return await this.userService.registerUser(user);
  }

  @Post("mail")
  async sendMail(@Body() id: string) {
    return this.userService.sendMail(id);
  }

  @Get("user")
  async fetchUser(@Query("id") id: string) {
    return this.userService.fetchUser(id);
  }

  @Post("verify-otp")
  async verifyOtp(@Body() details: { id: string; access: boolean }) {
    return this.userService.verifyOTP(details);
  }

  @Post("user-details")
  async userDetails(@Body() details: UserDetails) {
    return this.userService.userDetails(details);
  }

  @Post("login")
  async verifyLogin(@Body() details: Login) {
    return this.userService.verifyLogin(details);
  }

  @Get("profile/:id")
  async fetchProfileDetails(@Param('id') id: string) {
    return this.userService.fetchProfileDetails(id);
  }

  @Patch("profileImage")
  @UseInterceptors(FileInterceptor("image"))
  async uplaodProfileImage(
    @Query() id: string,
    @UploadedFile() profile: Express.Multer.File
  ) {
    return this.userService.uploadProfile(profile, id);
  }

  @Patch("image-remove")
  async removeProfileImage(@Body() id: string) {
    return this.userService.removeProfileImage(id);
  }

  @Put("update-details")
  async updateDetails(@Body() details: UpdateDetails, @Query() id: string) {
    return this.userService.updateDetails(details, id);
  }

  @Put("payment")
  async updatePayment(@Body() paymentData: PaymentData){
    return this.userService.updatePayment(paymentData)
  }
}
