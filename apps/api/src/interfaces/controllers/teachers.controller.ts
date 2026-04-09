import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiOperation, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Crear teacher (multipart/form-data con archivo opcional)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        last_name: { type: 'string' },
        id_attachments: { type: 'number' },
        is_active: { type: 'boolean' },
        attachmentType: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExtName}`);
        },
      }),
    }),
  )
  async create(@Body() body: any, @UploadedFile() file?: any): Promise<TeacherResponseDto> {
    const person = {
      name: body.name ?? body['person.name'] ?? (body.person && body.person.name),
      last_name: body.last_name ?? body['person.last_name'] ?? (body.person && body.person.last_name),
    } as any;

    const dto: CreateTeacherDto = {
      person,
      id_attachments: body.id_attachments ? Number(body.id_attachments) : undefined,
      is_active: body.is_active === undefined ? undefined : (body.is_active === 'true' || body.is_active === true),
      attachmentUrl: file ? `/uploads/${file.filename}` : undefined,
      attachmentType: body.attachmentType ?? (file ? file.mimetype.split('/')[0] : undefined),
    } as CreateTeacherDto;

    const res = await this.createTeacher.execute(dto);
    return this.appendFullUrls(res, undefined);
  }

  @Get()
  @ApiOperation({ summary: 'Listar teachers' })
  async findAll(@Req() req: any): Promise<TeacherResponseDto[]> {
    const rows = await this.listTeachers.execute();
    return rows.map((r) => this.appendFullUrls(r, req));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener teacher por id' })
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any): Promise<TeacherResponseDto> {
    const r = await this.getTeacher.execute(id);
    return this.appendFullUrls(r, req);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar teacher (multipart/form-data con archivo opcional)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        last_name: { type: 'string' },
        id_attachments: { type: 'number' },
        is_active: { type: 'boolean' },
        attachmentType: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExtName}`);
        },
      }),
    }),
  )
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any, @UploadedFile() file?: any, @Req() req?: any): Promise<TeacherResponseDto> {
    const dto: UpdateTeacherDto = {
      name: body.name ?? undefined,
      last_name: body.last_name ?? undefined,
      id_attachments: body.id_attachments ? Number(body.id_attachments) : undefined,
      is_active: body.is_active === undefined ? undefined : (body.is_active === 'true' || body.is_active === true),
      attachmentUrl: file ? `/uploads/${file.filename}` : undefined,
      attachmentType: body.attachmentType ?? (file ? file.mimetype.split('/')[0] : undefined),
    } as UpdateTeacherDto;

    const res = await this.updateTeacher.execute(id, dto);
    return this.appendFullUrls(res, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar teacher' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteTeacher.execute(id);
  }

  @Patch(':id/enable')
  @ApiOperation({ summary: 'Habilitar teacher' })
  async enable(@Param('id', ParseIntPipe) id: number, @Req() req?: any): Promise<TeacherResponseDto> {
    const res = await this.enableTeacher.execute(id);
    return this.appendFullUrls(res, req);
  }

  @Patch(':id/disable')
  @ApiOperation({ summary: 'Deshabilitar teacher' })
  async disable(@Param('id', ParseIntPipe) id: number, @Req() req?: any): Promise<TeacherResponseDto> {
    const res = await this.disableTeacher.execute(id);
    return this.appendFullUrls(res, req);
  }

  private appendFullUrls(dto: TeacherResponseDto, req?: any): TeacherResponseDto {
    if (!dto) return dto;
    const host = req ? `${req.protocol}://${req.get('host')}` : '';
    if (dto.attachment && dto.attachment.path && host) {
      // if path already absolute, leave it
      if (dto.attachment.path.startsWith('http')) return dto;
      dto.attachment.path = `${host}${dto.attachment.path}`;
    }
    return dto;
  }
}
