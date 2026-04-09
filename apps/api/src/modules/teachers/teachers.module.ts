import { Module } from '@nestjs/common';
import { TeachersController } from '../../interfaces/controllers/teachers.controller';
import { CreateTeacherUseCase } from '../../application/use-cases/teachers/create-teacher.usecase';
import { ListTeachersUseCase } from '../../application/use-cases/teachers/list-teachers.usecase';
import { GetTeacherUseCase } from '../../application/use-cases/teachers/get-teacher.usecase';
import { UpdateTeacherUseCase } from '../../application/use-cases/teachers/update-teacher.usecase';
import { DeleteTeacherUseCase } from '../../application/use-cases/teachers/delete-teacher.usecase';
import { EnableTeacherUseCase } from '../../application/use-cases/teachers/enable-teacher.usecase';
import { DisableTeacherUseCase } from '../../application/use-cases/teachers/disable-teacher.usecase';
import { InMemoryTeachersRepository } from '../../infrastructure/repositories/teachers/in-memory-teachers.repository';
import { PrismaTeachersRepository } from '../../infrastructure/repositories/teachers/prisma-teachers.repository';
import { TEACHERS_REPOSITORY } from '../../infrastructure/repositories/teachers/teachers.repository';

@Module({
  controllers: [TeachersController],
  providers: [
    CreateTeacherUseCase,
    ListTeachersUseCase,
    GetTeacherUseCase,
    UpdateTeacherUseCase,
    DeleteTeacherUseCase,
    EnableTeacherUseCase,
    DisableTeacherUseCase,
    // cambiar a PrismaTeachersRepository cuando quieras persistencia real
    InMemoryTeachersRepository,
    PrismaTeachersRepository,
    {
      provide: TEACHERS_REPOSITORY,
      useExisting: InMemoryTeachersRepository,
    },
  ],
})
export class TeachersModule {}
