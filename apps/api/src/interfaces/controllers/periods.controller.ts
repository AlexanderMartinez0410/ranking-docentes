import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePeriodDto } from '../../application/dto/periods/create-period.dto';
import { PeriodResponseDto } from '../../application/dto/periods/period-response.dto';
import { UpdatePeriodDto } from '../../application/dto/periods/update-period.dto';
import { CreatePeriodUseCase } from '../../application/use-cases/periods/create-period.usecase';
import { DeletePeriodUseCase } from '../../application/use-cases/periods/delete-period.usecase';
import { DisablePeriodUseCase } from '../../application/use-cases/periods/disable-period.usecase';
import { EnablePeriodUseCase } from '../../application/use-cases/periods/enable-period.usecase';
import { GetPeriodUseCase } from '../../application/use-cases/periods/get-period.usecase';
import { ListPeriodsUseCase } from '../../application/use-cases/periods/list-periods.usecase';
import { ListActivePeriodsUseCase } from '../../application/use-cases/periods/list-active-periods.usecase';
import { UpdatePeriodUseCase } from '../../application/use-cases/periods/update-period.usecase';

@ApiTags('periods')
@Controller('periods')
export class PeriodsController {
  constructor(
    private readonly createPeriod: CreatePeriodUseCase,
    private readonly listPeriods: ListPeriodsUseCase,
    private readonly listActivePeriods: ListActivePeriodsUseCase,
    private readonly getPeriod: GetPeriodUseCase,
    private readonly updatePeriod: UpdatePeriodUseCase,
    private readonly deletePeriod: DeletePeriodUseCase,
    private readonly enablePeriod: EnablePeriodUseCase,
    private readonly disablePeriod: DisablePeriodUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear period' })
  create(@Body() dto: CreatePeriodDto): Promise<PeriodResponseDto> {
    return this.createPeriod.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar periods' })
  findAll(): Promise<PeriodResponseDto[]> {
    return this.listPeriods.execute();
  }

  @Get('active')
  @ApiOperation({ summary: 'Listar periods activos' })
  findActive(): Promise<PeriodResponseDto[]> {
    return this.listActivePeriods.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener period por id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PeriodResponseDto> {
    return this.getPeriod.execute(id) as Promise<PeriodResponseDto>;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar period' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePeriodDto): Promise<PeriodResponseDto> {
    return this.updatePeriod.execute(id, dto) as Promise<PeriodResponseDto>;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar period' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deletePeriod.execute(id);
  }

  @Patch(':id/enable')
  @ApiOperation({ summary: 'Habilitar period' })
  enable(@Param('id', ParseIntPipe) id: number): Promise<PeriodResponseDto> {
    return this.enablePeriod.execute(id) as Promise<PeriodResponseDto>;
  }

  @Patch(':id/disable')
  @ApiOperation({ summary: 'Deshabilitar period' })
  disable(@Param('id', ParseIntPipe) id: number): Promise<PeriodResponseDto> {
    return this.disablePeriod.execute(id) as Promise<PeriodResponseDto>;
  }
}
