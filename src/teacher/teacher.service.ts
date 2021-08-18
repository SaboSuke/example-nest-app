import { Injectable } from '@nestjs/common';
import { teachers } from '../db'
import { FindTeacherResponse } from './teacher.dto';

@Injectable()
export class TeacherService {

    private teachers = teachers;

    getTeachers(): FindTeacherResponse[] {
        return this.teachers;
    }

    getTeacherById(id: string): FindTeacherResponse {
        return this.teachers.find(t => t.id === id);
    }

}
