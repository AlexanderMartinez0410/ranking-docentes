import { Injectable, Inject } from '@nestjs/common';
import { PeriodResponseDto } from '../../dto/periods/period-response.dto';
import { PERIODS_REPOSITORY } from '../../../infrastructure/repositories/periods/periods.repository';
import type { PeriodsRepository } from '../../../infrastructure/repositories/periods/periods.repository';

@Injectable()
export class ListPeriodsUseCase {
  constructor(
    @Inject(PERIODS_REPOSITORY)
    private readonly repo: PeriodsRepository,
  ) {}

  execute(): Promise<PeriodResponseDto[]> {
    return this.repo.findAll();
  }
}
