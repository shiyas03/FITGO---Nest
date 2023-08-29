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
import { Login, UpdateDetails, UserDetails } from "./user.interface";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("")
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post("register")
  async registerUser(@Body() user: Users) {
    return await this.userService.registerUser(user);
  }

  @Post("mail")
  async sendMail(@Body() data: { email: string }) {
    return await this.userService.sendMail(data.email);
  }

  @Get("user")
  async fetchUser(@Query("id") id: string) {
    return await this.userService.fetchUser(id);
  }

  @Post("verify")
  async verifyOtp(@Body() user: Users) {
    return await this.userService.verify(user);
  }

  @Post("user-details")
  async userDetails(@Body() details: UserDetails) {
    return await this.userService.userDetails(details);
  }

  @Post("login")
  async verifyLogin(@Body() details: Login) {
    return await this.userService.verifyLogin(details);
  }

  @Get("profile/:id")
  async fetchProfileDetails(@Param('id') id: string) {
    return await this.userService.fetchProfileDetails(id);
  }

  @Patch("profileImage")
  @UseInterceptors(FileInterceptor("image"))
  async uplaodProfileImage(
    @Query() id: string,
    @UploadedFile() profile: Express.Multer.File
  ) {
    return await this.userService.uploadProfile(profile, id);
  }

  @Patch("image-remove")
  async removeProfileImage(@Body() id: string) {
    return await this.userService.removeProfileImage(id);
  }

  @Put("update-details")
  async updateDetails(@Body() details: UpdateDetails, @Query() id: string) {
    return await this.userService.updateDetails(details, id);
  }

}
