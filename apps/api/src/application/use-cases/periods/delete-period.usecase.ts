import { Inject, Injectable } from '@nestjs/common';
import { PERIODS_REPOSITORY } from '../../../infrastructure/repositories/periods/periods.repository';
import type { PeriodsRepository } from '../../../infrastructure/repositories/periods/periods.repository';

@Injectable()
export class DeletePeriodUseCase {
  constructor(
    @Inject(PERIODS_REPOSITORY)
    private readonly repo: PeriodsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
