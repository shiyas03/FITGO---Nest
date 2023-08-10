import { Body, Controller, Get, Patch, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { cropImage } from '../helpers/multer/multer.config';

@Controller('workouts')
export class WorkoutsController {

    constructor(private workoutService: WorkoutsService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor("files"))
    async uploadWorkout(@Body() data: { files: string[] },
        @UploadedFile() file: Express.Multer.File,
        @Query('id') id: string) {
        return this.workoutService.uploadWorkout(data.files, file, id)
    }

    @Put('update')
    @UseInterceptors(FilesInterceptor("files", 2))
    async updateWorkout(@Body() data: { files: string[] },
        @UploadedFiles() file: Express.Multer.File[],
        @Query('id') id: string) {
        if (file[1]) cropImage(file[1], [800, 400])
        return this.workoutService.updateWorkout(data.files, file, id)
    }

    @Get('fetch')
    async fetchWorkouts() {
        return this.workoutService.fetchWorkouts()
    }

    @Patch('publish')
    async publishChanges(@Query('id') id: string, @Body() data: { change: boolean }) {
        return this.workoutService.publishChanges(id, data.change)
    }
}
