import { Body, Controller, Post, UseInterceptors, UploadedFiles, Param, Get, Patch, Query, UploadedFile } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { Register, Trainer } from './trainer.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { cropImage } from '../helpers/multer/multer.config';

@Controller('trainer')
export class TrainerController {

    constructor(private trainerServices: TrainerService) { }

    @Post('login')
    async trainerLogin(@Body() trainerData: Trainer) {
        return this.trainerServices.verifyTrainer(trainerData)
    }

    @Post('register')
    async register(@Body() trainerData: Register) {
        return this.trainerServices.register(trainerData)
    }

    @Post('details/:id')
    @UseInterceptors(FilesInterceptor('details', 10))
    async detailsUpload(@Body('details') details: string[],
        @UploadedFiles() file: Express.Multer.File[],
        @Param('id') id: string) {
        const About = details
        const cv = file[0]
        let certificates = []
        for (let i = 1; i < details.length; i++) {
            certificates.push(details[i])
        }

        return this.trainerServices.detailsUpload(details, cv, certificates, id)
    }

    @Get('access/:id')
    async getAccess(@Param('id') id: string) {
        return this.trainerServices.getAccess(id)
    }

    @Get('fetch/:id')
    async fetchTrainers(@Param('id') id: string) {
        return this.trainerServices.fetchProfileDetails(id)
    }

    @Patch("image")
    @UseInterceptors(FileInterceptor("image"))
    async uplaodProfileImage(
        @Query() id: string,
        @UploadedFile() profile: Express.Multer.File
    ) {
        cropImage(profile, [400, 500])
        return this.trainerServices.uploadProfile(profile, id);
    }

    @Get('fetchAll')
    async fetchAllTrainers(){
        return this.trainerServices.fetchAllTrainers()
    }

}
