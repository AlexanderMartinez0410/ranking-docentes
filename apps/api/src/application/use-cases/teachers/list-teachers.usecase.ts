import { Inject, Injectable } from '@nestjs/common';
import { TeacherResponseDto } from '../../dto/teachers/teacher-response.dto';
import { TEACHERS_REPOSITORY } from '../../../infrastructure/repositories/teachers/teachers.repository';
import type { TeachersRepository } from '../../../infrastructure/repositories/teachers/teachers.repository';

@Injectable()
export class ListTeachersUseCase {
  constructor(
    @Inject(TEACHERS_REPOSITORY)
    private readonly repo: TeachersRepository,
  ) {}

  execute(): Promise<TeacherResponseDto[]> {
    return this.repo.findAll();
  }
}
