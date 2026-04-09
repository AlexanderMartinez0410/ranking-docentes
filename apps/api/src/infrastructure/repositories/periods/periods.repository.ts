import { CreatePeriodDto } from '../../../application/dto/periods/create-period.dto';
import { PeriodResponseDto } from '../../../application/dto/periods/period-response.dto';
import { UpdatePeriodDto } from '../../../application/dto/periods/update-period.dto';

export const PERIODS_REPOSITORY = Symbol('PERIODS_REPOSITORY');

export interface PeriodsRepository {
  create(dto: CreatePeriodDto): Promise<PeriodResponseDto>;
  findAll(): Promise<PeriodResponseDto[]>;
  findActive(): Promise<PeriodResponseDto[]>;
  findById(id: number): Promise<PeriodResponseDto | undefined>;
  update(id: number, dto: UpdatePeriodDto): Promise<PeriodResponseDto | undefined>;
  delete(id: number): Promise<boolean>;
  enable(id: number): Promise<PeriodResponseDto | undefined>;
  disable(id: number): Promise<PeriodResponseDto | undefined>;
}
