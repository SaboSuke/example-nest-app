import { Controller, Get, Post, Put, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CreateStudentDto, FindStudentsResponseDto, UpdateStudentDto } from './student.dto'
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {

    // injecting the student service 
    constructor(private readonly studentService: StudentService) {}

    @Get()
    getStudents(): FindStudentsResponseDto[] {
        return this.studentService.getStudents();
    }

    @Get('/:studentId')
    getStudentById(
        // @Param() params: {studentId: string}
        // @Param('id', ParseIntPipe()) id: number
        @Param('studentId', new ParseUUIDPipe()) studentId: string
    ) {
        return this.studentService.getStudentById(studentId);
    }

    @Post()
    createStudent(
        @Body() body: CreateStudentDto
    ) {
        return this.studentService.createStudent(body);
    }

    @Put('/:studentId')
    updateStudent(
        @Param('studentId', new ParseUUIDPipe()) studentId: string,
        @Body() body: UpdateStudentDto,
    ) {
        return this.studentService.updateStudent(studentId, body);
    }

}