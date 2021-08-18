import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { students } from '../db';

@Injectable()
export class ValidStudentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.studentId;
    //returns true if exists else returns false
    const studentExists = students.some(student => student.id === id);

    if (!studentExists) {
      throw new HttpException("Student not found", 400);
    }else
      next();
  }
}
