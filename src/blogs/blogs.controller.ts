import { Body, Controller, Get, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blogs')
export class BlogsController {

    constructor(private blogServices: BlogsService) { }

    @Post('blog-upload')
    @UseInterceptors(FileInterceptor('details'))
    async uploadBlog(@Query() id: string,
        @UploadedFile() details: Express.Multer.File,
        @Body() data: { details: string[] }) {
        return this.blogServices.uploadBlog(data, details, id)
    }

    @Get('fetch')
    async fetchBlogs() {
        return this.blogServices.fetchBlogs()
    }

    @Patch('publish')
    async publishBlogs(@Body() data: { action: boolean }, @Query() id: string) {
        return this.blogServices.publishChanges(data.action, id)
    }
}
