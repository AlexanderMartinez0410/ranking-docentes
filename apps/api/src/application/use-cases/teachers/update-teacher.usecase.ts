import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTeacherDto } from '../../dto/teachers/update-teacher.dto';
import { TeacherResponseDto } from '../../dto/teachers/teacher-response.dto';
import { TEACHERS_REPOSITORY } from '../../../infrastructure/repositories/teachers/teachers.repository';
import type { TeachersRepository } from '../../../infrastructure/repositories/teachers/teachers.repository';

@Injectable()
export class UpdateTeacherUseCase {
  constructor(
    @Inject(TEACHERS_REPOSITORY)
    private readonly repo: TeachersRepository,
  ) {}

  async execute(id: number, dto: UpdateTeacherDto): Promise<TeacherResponseDto> {
    const t = await this.repo.update(id, dto);
    if (!t) throw new NotFoundException('Teacher not found');
    return t;
  }
}
