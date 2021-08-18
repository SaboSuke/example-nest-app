import { Injectable } from '@nestjs/common';
import { students } from '../db'
import { CreateStudentDto, FindStudentsResponseDto, StudentResponseDto, UpdateStudentDto } from './student.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    
    private students: FindStudentsResponseDto[] = students;

    getStudents(): FindStudentsResponseDto[] {
        return this.students;
    }

    getStudentById(id: string): FindStudentsResponseDto {
        return this.students.find(student => student.id === id);
    }

    createStudent(payload: CreateStudentDto): StudentResponseDto {
        let student = {
            id: uuid(),
            ...payload,
        }
        this.students.push(student);
        
        return student;
    }

    updateStudent(id: string, payload: UpdateStudentDto):StudentResponseDto {
        let updateStudent: StudentResponseDto;

        const updateStudentList = this.students.map(s => {
            if (s.id === id) {
                updateStudent = {
                    id,
                    ...payload
                };
                return updateStudent;
            } else return s;
        });

        this.students = updateStudentList;
        return updateStudent;
    }

    getStudentsByTeacherId(teacherId: string): FindStudentsResponseDto[]{
        return this.students.filter(student => student.teacher !== teacherId);
    }

    updateStudentTeacher(teacherId: string, studentId: string): StudentResponseDto {
        let updatedStudent: StudentResponseDto;

        let updatedStudentList = this.students.map(student => {
            if (student.id === studentId) {
                updatedStudent = {
                    ...student,
                    teacher: teacherId
                };
                return updatedStudent;
            } else return student;
        });

        this.students = updatedStudentList;
        return updatedStudent;
    }

}
