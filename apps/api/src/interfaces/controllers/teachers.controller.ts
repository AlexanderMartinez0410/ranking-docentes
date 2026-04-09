import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTeacherDto } from '../../application/dto/teachers/create-teacher.dto';
import { UpdateTeacherDto } from '../../application/dto/teachers/update-teacher.dto';
import { TeacherResponseDto } from '../../application/dto/teachers/teacher-response.dto';
import { CreateTeacherUseCase } from '../../application/use-cases/teachers/create-teacher.usecase';
import { ListTeachersUseCase } from '../../application/use-cases/teachers/list-teachers.usecase';
import { GetTeacherUseCase } from '../../application/use-cases/teachers/get-teacher.usecase';
import { UpdateTeacherUseCase } from '../../application/use-cases/teachers/update-teacher.usecase';
import { DeleteTeacherUseCase } from '../../application/use-cases/teachers/delete-teacher.usecase';
import { EnableTeacherUseCase } from '../../application/use-cases/teachers/enable-teacher.usecase';
import { DisableTeacherUseCase } from '../../application/use-cases/teachers/disable-teacher.usecase';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly createTeacher: CreateTeacherUseCase,
    private readonly listTeachers: ListTeachersUseCase,
    private readonly getTeacher: GetTeacherUseCase,
    private readonly updateTeacher: UpdateTeacherUseCase,
    private readonly deleteTeacher: DeleteTeacherUseCase,
    private readonly enableTeacher: EnableTeacherUseCase,
    private readonly disableTeacher: DisableTeacherUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear teacher' })
  create(@Body() dto: CreateTeacherDto): Promise<TeacherResponseDto> {
    return this.createTeacher.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar teachers' })
  findAll(): Promise<TeacherResponseDto[]> {
    return this.listTeachers.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener teacher por id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TeacherResponseDto> {
    return this.getTeacher.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar teacher' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTeacherDto): Promise<TeacherResponseDto> {
    return this.updateTeacher.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar teacher' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteTeacher.execute(id);
  }

  @Patch(':id/enable')
  @ApiOperation({ summary: 'Habilitar teacher' })
  enable(@Param('id', ParseIntPipe) id: number): Promise<TeacherResponseDto> {
    return this.enableTeacher.execute(id);
  }

  @Patch(':id/disable')
  @ApiOperation({ summary: 'Deshabilitar teacher' })
  disable(@Param('id', ParseIntPipe) id: number): Promise<TeacherResponseDto> {
    return this.disableTeacher.execute(id);
  }
}
