import { Module } from '@nestjs/common';
import { PeriodsController } from '../../interfaces/controllers/periods.controller';
import { CreatePeriodUseCase } from '../../application/use-cases/periods/create-period.usecase';
import { ListPeriodsUseCase } from '../../application/use-cases/periods/list-periods.usecase';
import { ListActivePeriodsUseCase } from '../../application/use-cases/periods/list-active-periods.usecase';
import { GetPeriodUseCase } from '../../application/use-cases/periods/get-period.usecase';
import { UpdatePeriodUseCase } from '../../application/use-cases/periods/update-period.usecase';
import { DeletePeriodUseCase } from '../../application/use-cases/periods/delete-period.usecase';
import { EnablePeriodUseCase } from '../../application/use-cases/periods/enable-period.usecase';
import { DisablePeriodUseCase } from '../../application/use-cases/periods/disable-period.usecase';
import { PrismaPeriodsRepository } from '../../infrastructure/repositories/periods/prisma-periods.repository';
import { PERIODS_REPOSITORY } from '../../infrastructure/repositories/periods/periods.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PeriodsController],
  providers: [
    CreatePeriodUseCase,
    ListPeriodsUseCase,
    ListActivePeriodsUseCase,
    GetPeriodUseCase,
    UpdatePeriodUseCase,
    DeletePeriodUseCase,
    EnablePeriodUseCase,
    DisablePeriodUseCase,
    PrismaPeriodsRepository,
    {
      provide: PERIODS_REPOSITORY,
      useClass: PrismaPeriodsRepository,
    },
  ],
})
export class PeriodsModule {}
