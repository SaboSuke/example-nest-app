import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FindTeacherResponse } from './teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {

    constructor(private readonly teacherService: TeacherService){}

    @Get()
    getTeachers(): FindTeacherResponse[]{
        return this.teacherService.getTeachers();
    }

    @Get('/:teacherId')
    getTeacherById(
        @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
    ):FindTeacherResponse {
        return this.teacherService.getTeacherById(teacherId);
    }

}
