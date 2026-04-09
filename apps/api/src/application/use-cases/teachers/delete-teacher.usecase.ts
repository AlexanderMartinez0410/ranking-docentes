import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TEACHERS_REPOSITORY } from '../../../infrastructure/repositories/teachers/teachers.repository';
import type { TeachersRepository } from '../../../infrastructure/repositories/teachers/teachers.repository';

@Injectable()
export class DeleteTeacherUseCase {
  constructor(
    @Inject(TEACHERS_REPOSITORY)
    private readonly repo: TeachersRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new NotFoundException('Teacher not found');
  }
}
