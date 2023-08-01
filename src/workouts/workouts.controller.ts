import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('workouts')
export class WorkoutsController {

    constructor(private workoutService: WorkoutsService) { }

    @Post('upload')
    @UseInterceptors(FilesInterceptor("files", 2))
    async uploadWorkout(@Body() data: { files: string[] },
        @UploadedFiles() file: Express.Multer.File[],
        @Query('id') id: string) {
            return this.workoutService.uploadWorkout(data.files,file,id)
    }

    @Get('fetch')
    async fetchWorkouts(){
        return this.workoutService.fetchWorkouts()
    }
}
