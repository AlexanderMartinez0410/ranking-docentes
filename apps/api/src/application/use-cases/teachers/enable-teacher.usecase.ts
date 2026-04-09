import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TeacherResponseDto } from '../../dto/teachers/teacher-response.dto';
import { TEACHERS_REPOSITORY } from '../../../infrastructure/repositories/teachers/teachers.repository';
import type { TeachersRepository } from '../../../infrastructure/repositories/teachers/teachers.repository';

@Injectable()
export class EnableTeacherUseCase {
  constructor(
    @Inject(TEACHERS_REPOSITORY)
    private readonly repo: TeachersRepository,
  ) {}

  async execute(id: number): Promise<TeacherResponseDto> {
    const t = await this.repo.enable(id);
    if (!t) throw new NotFoundException('Teacher not found');
    return t;
  }
}
