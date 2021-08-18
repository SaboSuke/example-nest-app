import { StudentController } from './student.controller';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StudentService } from './student.service';
import { ValidStudentMiddleware } from '../middlewares/validstudent.middleware';

@Module({
    imports: [],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService]
})
export class StudentModule implements NestModule {
    // configure by a middeware
    configure(consumer: MiddlewareConsumer) {
        // specify the middleware, the routes and methods to apply for this consumer
        consumer.apply(ValidStudentMiddleware).forRoutes(
            {
                path: 'students/:studentId',
                method: RequestMethod.GET
            },
            {
                path: 'students/:studentId',
                method: RequestMethod.PUT
            },
        )
    }
}
