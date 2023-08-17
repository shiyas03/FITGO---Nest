import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { TrainerModel } from "./schema/trainer.schema";
import { JwtService } from "@nestjs/jwt";
import { Files, Profile, Register, Trainer, Update, fetchTrainers } from "./trainer.interface";
import * as argon from "argon2";
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class TrainerService {
  constructor(
    @InjectModel("Trainer") private trainerModel: Model<TrainerModel>,
    private jwtService: JwtService, private readonly mailService: MailerService,
  ) { }

  async verifyTrainer(
    trainer: Trainer
  ): Promise<{ token?: string; message?: string }> {
    try {
      const data = await this.trainerModel.findOne({ email: trainer.email });
      if (data && data.access == true) {
        const verifyPassword = await argon.verify(
          data.password,
          trainer.password
        );
        const paylaod = { id: data._id, email: data.email, name: data.name };
        const token = await this.jwtService.signAsync(paylaod);
        return verifyPassword
          ? { token: token }
          : { message: "Incorrect password" };
      } else if (data.isUpload == true) {
        return { message: "Access resticted" }
      }
      return { message: "Email not found" };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async register(details: Register): Promise<{ email?: boolean; id?: string }> {
    try {
      const data = await this.trainerModel.findOne({ email: details.email });
      if (data && data.isUpload) {
        return { email: true };
      } else {
        const hashPassowrd = await argon.hash(details.password);
        const newTrianer = new this.trainerModel({
          name: details.name,
          email: details.email,
          phone: details.phone,
          password: hashPassowrd,
        });
        await newTrianer.save();
        return { id: newTrianer._id };
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async detailsUpload(
    details: string[],
    cv: Files,
    certificates: Files[],
    id: string
  ): Promise<{ success: boolean; email?: string }> {
    try {
      let documents = certificates.map((data) => data.filename);
      const data = await this.trainerModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            experience: details[0],
            specialized: details[1],
            about: details[2],
            cv: cv.filename,
            certificate: documents,
            isUpload: true,
          },
        }
      );
      if (data) {
        return { success: true, email: data.email };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getAccess(id: string): Promise<{ access: boolean }> {
    try {
      const data = await this.trainerModel.findOne({ _id: id }, { access: 1, _id: 0 })
      if (!data) {
        throw new NotFoundException("Details not found");
      }
      return data
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async fetchProfileDetails(id: string): Promise<Profile> {
    try {
      const data = await this.trainerModel.findOne(
        { _id: id },
        { certificate: 0, cv: 0 }
      );
      if (!data) {
        throw new NotFoundException('Details not found');
      }
      return data
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async uploadProfile(profile: Express.Multer.File, id: string) {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const data = await this.trainerModel.updateOne(
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
        throw new Error("could't find trainer profile");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async fetchAllTrainers(): Promise<fetchTrainers[]> {
    try {
      const data = <fetchTrainers[]>await this.trainerModel.find().populate('reviews.userId')
      if (!data) {
        throw new Error("could't find trainers");
      }
      return data
    } catch (error) {
      console.log(error);
      throw new Error(error)
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
      console.log(error);
      throw new Error(error)
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
      throw new Error(error);
    }
  }

  async updateService(data: string, id: string): Promise<boolean> {
    try {
      await this.trainerModel.updateOne({ _id: id }, {
        $push: { services: data }
      }, { new: true })
      return true
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }

  async removeService(data: string, id: string): Promise<boolean> {
    try {
      await this.trainerModel.updateOne({ _id: id }, {
        $pull: { services: data }
      }, { new: true })
      return true
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }

  async updateProfile(data: Update, id: string): Promise<boolean> {
    try {
      await this.trainerModel.updateOne({ _id: id }, {
        $set: {
          name: data.name,
          phone: data.phone,
          about: data.about
        }
      })
      return true
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }

  async uploadReview(data: { review: string, userId: string }, id: string): Promise<boolean> {
    try {
      const complete = await this.trainerModel.updateOne({ _id: id }, {
        $push: {
          reviews: data
        }
      }, { new: true })
      if (complete.modifiedCount == 1) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(error)
    }
  }
}
