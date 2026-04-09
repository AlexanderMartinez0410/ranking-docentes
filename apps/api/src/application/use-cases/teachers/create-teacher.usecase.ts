import { Inject, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from '../../dto/teachers/create-teacher.dto';
import { TeacherResponseDto } from '../../dto/teachers/teacher-response.dto';
import { TEACHERS_REPOSITORY } from '../../../infrastructure/repositories/teachers/teachers.repository';
import type { TeachersRepository } from '../../../infrastructure/repositories/teachers/teachers.repository';

@Injectable()
export class CreateTeacherUseCase {
  constructor(
    @Inject(TEACHERS_REPOSITORY)
    private readonly repo: TeachersRepository,
  ) {}

  execute(dto: CreateTeacherDto): Promise<TeacherResponseDto> {
    return this.repo.create(dto);
  }
}
