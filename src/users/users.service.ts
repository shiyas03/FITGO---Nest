import { Injectable, NotFoundException } from "@nestjs/common";
import { Users, userDocument } from "./schema/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as argon from "argon2";
import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";
import {
  Login,
  LoginReturn,
  RegisterReturn,
  UserData,
  UserDetails,
  Profile,
  UpdateDetails,
} from "./user.interface";
import mongoose from "mongoose";
import * as fs from "fs";
import * as handlebars from "handlebars";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("Users") private userModel: Model<userDocument>,
    private readonly mailService: MailerService,
    private jwtService: JwtService
  ) {}

  async registerUser(user: Users): Promise<RegisterReturn> {
    try {
      const { name, email, phone, password } = user;
      const usedEmail = await this.userModel.findOne({
        email: { $regex: new RegExp("^" + email + "$", "i") },
      });
      const usedPhone = await this.userModel.findOne({ phone: phone });
      if (usedEmail) {
        if (usedEmail.access == true) {
          return { success: false, message: "Email already used" };
        } else {
          if (usedPhone && usedPhone.email !== email) {
            return { success: false, message: "Phone number already used" };
          } else {
            const hashPassowrd = await argon.hash(password);
            const data = await this.userModel.findOneAndUpdate(
              { email: email },
              {
                $set: {
                  name: name,
                  phone: phone,
                  password: hashPassowrd,
                },
              }
            );
            return { success: true, id: data._id };
          }
        }
      } else if (usedPhone && usedPhone.email !== email) {
        return { success: false, message: "Phone number already used" };
      } else {
        const hashPassowrd = await argon.hash(password);
        const newUser = new this.userModel({
          name: name,
          email: email,
          phone: phone,
          password: hashPassowrd,
        });
        await newUser.save();
        return { success: true, id: newUser._id };
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async sendMail(id: string): Promise<{ success: boolean; otp: string }> {
    try {
      let template: HandlebarsTemplateDelegate<{ otp: string }>;
      const templatePath = "src/helpers/mail-templates/otp-template.hbs";
      const templateContent = fs.readFileSync(templatePath, "utf8");
      template = handlebars.compile(templateContent);

      const objectId = new mongoose.Types.ObjectId(id);
      const data = await this.userModel.findOne(
        { _id: objectId },
        { email: 1 }
      );

      const chars = "0123456789";
      let otp: string = "";

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        otp += chars[randomIndex];
      }

      const htmlContent = template({ otp: otp });
      await this.mailService.sendMail({
        to: <string>data.email,
        from: "ffitgo@gmail.com",
        subject: "otp for authentication",
        text: "Hello Welcome!",
        html: htmlContent,
      });
      return { success: true, otp: otp };
    } catch (error) {
      console.log(error);
      throw Error("Failed to send email");
    }
  }

  async verifyOTP(details: { id: string; access: boolean }) {
    try {
      if (details.access === true && details.id) {
        await this.userModel.findOneAndUpdate(
          { _id: details.id },
          {
            $set: {
              access: true,
            },
          }
        );
        return { success: true };
      }
      throw new Error("Couldn't find data");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async fetchUser(id: string): Promise<UserData> {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const userData = <UserData>(
        await this.userModel.findOne(
          { _id: objectId },
          { name: 1, email: 1, access: 1 }
        )
      );
      if (userData) {
        return userData;
      } else {
        throw Error;
      }
    } catch (error) {
      // console.log(error);
      throw new NotFoundException(error);
    }
  }

  async userDetails(
    details: UserDetails
  ): Promise<{ success: boolean; token: string }> {
    try {
      const id = details.id;
      const data = await this.userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            age: details.age,
            height: details.height,
            weight: details.weight,
            goal: details.goal,
            goalWeight: details.goalWeight,
            months: details.months,
            gender: details.gender,
            activity: details.activity,
            caloriesBurn: details.calorieBurn,
            caloriesNeed: details.calorieNeed,
            isUpload: true,
          },
        }
      );
      if (data) {
        const paylaod = { sub: data._id, email: data.email };
        const token = await this.jwtService.signAsync(paylaod);
        return { success: true, token: token };
      } else {
        throw new Error("couldn't find data");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async verifyLogin(details: Login): Promise<LoginReturn> {
    try {
      const data = await this.userModel.findOne({
        email: { $regex: new RegExp("^" + details.email + "$", "i") },
      });
      if (data) {
        if (data.access == true) {
          const paylaod = { sub: data._id, email: data.email };
          const token = await this.jwtService.signAsync(paylaod);
          const verifyPass = await argon.verify(
            data.password,
            details.password
          );
          return verifyPass
            ? { token: token, id: data._id }
            : { message: "Incorrect password" };
        } else {
          return { message: "Access denied" };
        }
      } else {
        return { message: "Email not found" };
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async fetchProfileDetails(id: string): Promise<Profile> {
    try {
      const data = <Profile>(
        await this.userModel.findOne(
          { _id: id },
          { password: 0, access: 0, __v: 0 }
        )
      );
      if (data) {
        return data;
      } else {
        throw new Error("couldn't find user details")
      }
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }

  async uploadProfile(profile: Express.Multer.File, id: string) {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const data = await this.userModel.findOneAndUpdate(
        { _id: objectId },
        {
          $set: {
            imageUrl: profile.filename,
          },
        }
      );
      if (data) {
        return { success: true };
      } else {
        throw new Error("could't find user profile")
      }
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }

  async removeProfileImage(id: string): Promise<{ success: boolean }> {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const data = await this.userModel.findOneAndUpdate(
        { _id: objectId },
        {
          $set: {
            imageUrl: "",
          },
        }
      );
      if (data) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateDetails(
    details: UpdateDetails,
    id: string
  ): Promise<{ success: boolean }> {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const data = await this.userModel.findOneAndUpdate(
        { _id: objectId },
        {
          $set: {
            name: details.name,
            phone: details.phone,
            age: details.age,
            height: details.height,
            weight: details.weight,
          },
        }
      );
      if (data) {
        return { success: true };
      } else {
        throw new Error("Couldn't find user details")
      }
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }
}