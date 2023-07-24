import { Body, Controller, Post, UseInterceptors, UploadedFiles, Param } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { Register, Trainer } from './trainer.interface';
import { FilesInterceptor } from '@nestjs/platform-express';


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
    async detailsUpload(@Body('details') about: string,
        @UploadedFiles() details: Express.Multer.File[],
        @Param('id') id: string) {            
        const About = about
        const cv = details[0]
        let certificates = []
        for (let i = 1; i < details.length; i++) {
            certificates.push(details[i])
        }

        return this.trainerServices.detailsUpload(About, cv, certificates, id)
    }
}
