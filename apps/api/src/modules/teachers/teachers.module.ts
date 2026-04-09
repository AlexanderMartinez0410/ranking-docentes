import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TeachersController } from '../../interfaces/controllers/teachers.controller';
import { CreateTeacherUseCase } from '../../application/use-cases/teachers/create-teacher.usecase';
import { ListTeachersUseCase } from '../../application/use-cases/teachers/list-teachers.usecase';
import { GetTeacherUseCase } from '../../application/use-cases/teachers/get-teacher.usecase';
import { UpdateTeacherUseCase } from '../../application/use-cases/teachers/update-teacher.usecase';
import { DeleteTeacherUseCase } from '../../application/use-cases/teachers/delete-teacher.usecase';
import { EnableTeacherUseCase } from '../../application/use-cases/teachers/enable-teacher.usecase';
import { DisableTeacherUseCase } from '../../application/use-cases/teachers/disable-teacher.usecase';
import { PrismaTeachersRepository } from '../../infrastructure/repositories/teachers/prisma-teachers.repository';
import { TEACHERS_REPOSITORY } from '../../infrastructure/repositories/teachers/teachers.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TeachersController],
  providers: [
    CreateTeacherUseCase,
    ListTeachersUseCase,
    GetTeacherUseCase,
    UpdateTeacherUseCase,
    DeleteTeacherUseCase,
    EnableTeacherUseCase,
    DisableTeacherUseCase,
    PrismaTeachersRepository,
    {
      provide: TEACHERS_REPOSITORY,
      useExisting: PrismaTeachersRepository,
    },
  ],
})
export class TeachersModule {}
