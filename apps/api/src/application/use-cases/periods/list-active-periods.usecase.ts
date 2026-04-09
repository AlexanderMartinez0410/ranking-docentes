import { Inject, Injectable } from '@nestjs/common';
import { PERIODS_REPOSITORY } from '../../../infrastructure/repositories/periods/periods.repository';
import type { PeriodsRepository } from '../../../infrastructure/repositories/periods/periods.repository';
import type { PeriodResponseDto } from '../../dto/periods/period-response.dto';

@Injectable()
export class ListActivePeriodsUseCase {
  constructor(@Inject(PERIODS_REPOSITORY) private readonly repo: PeriodsRepository) {}

  execute(): Promise<PeriodResponseDto[]> {
    return this.repo.findActive();
  }
}
