import { Inject, Injectable } from '@nestjs/common';
import { UpdatePeriodDto } from '../../dto/periods/update-period.dto';
import { PeriodResponseDto } from '../../dto/periods/period-response.dto';
import { PERIODS_REPOSITORY } from '../../../infrastructure/repositories/periods/periods.repository';
import type { PeriodsRepository } from '../../../infrastructure/repositories/periods/periods.repository';

@Injectable()
export class UpdatePeriodUseCase {
  constructor(
    @Inject(PERIODS_REPOSITORY)
    private readonly repo: PeriodsRepository,
  ) {}

  execute(id: number, dto: UpdatePeriodDto): Promise<PeriodResponseDto | undefined> {
    return this.repo.update(id, dto);
  }
}
