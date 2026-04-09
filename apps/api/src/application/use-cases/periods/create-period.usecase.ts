import { Inject, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from '../../dto/periods/create-period.dto';
import { PeriodResponseDto } from '../../dto/periods/period-response.dto';
import { PERIODS_REPOSITORY } from '../../../infrastructure/repositories/periods/periods.repository';
import type { PeriodsRepository } from '../../../infrastructure/repositories/periods/periods.repository';

@Injectable()
export class CreatePeriodUseCase {
  constructor(
    @Inject(PERIODS_REPOSITORY)
    private readonly repo: PeriodsRepository,
  ) {}

  execute(dto: CreatePeriodDto): Promise<PeriodResponseDto> {
    return this.repo.create(dto);
  }
}
