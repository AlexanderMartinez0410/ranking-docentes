import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { PeriodsRepository } from './periods.repository';
import type { CreatePeriodDto } from '../../../application/dto/periods/create-period.dto';
import type { UpdatePeriodDto } from '../../../application/dto/periods/update-period.dto';
import type { PeriodResponseDto } from '../../../application/dto/periods/period-response.dto';

@Injectable()
export class PrismaPeriodsRepository implements PeriodsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePeriodDto): Promise<PeriodResponseDto> {
    return (this.prisma as any).periods.create({ data: { name: dto.name, is_active: true } });
  }

  findAll(): Promise<PeriodResponseDto[]> {
    return (this.prisma as any).periods.findMany();
  }

  findActive(): Promise<PeriodResponseDto[]> {
    return (this.prisma as any).periods.findMany({ where: { is_active: true } });
  }

  async findById(id: number): Promise<PeriodResponseDto | undefined> {
    const row = await (this.prisma as any).periods.findUnique({ where: { id_periods: id } });
    return row ?? undefined;
  }

  update(id: number, dto: UpdatePeriodDto): Promise<PeriodResponseDto> {
    return (this.prisma as any).periods.update({ where: { id_periods: id }, data: dto });
  }

  async delete(id: number): Promise<boolean> {
    await (this.prisma as any).periods.delete({ where: { id_periods: id } });
    return true;
  }

  enable(id: number): Promise<PeriodResponseDto> {
    return (this.prisma as any).periods.update({ where: { id_periods: id }, data: { is_active: true } });
  }

  disable(id: number): Promise<PeriodResponseDto> {
    return (this.prisma as any).periods.update({ where: { id_periods: id }, data: { is_active: false } });
  }
}
