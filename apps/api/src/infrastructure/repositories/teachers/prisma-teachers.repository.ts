import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { TeachersRepository } from './teachers.repository';
import type { CreateTeacherDto } from '../../../application/dto/teachers/create-teacher.dto';
import type { UpdateTeacherDto } from '../../../application/dto/teachers/update-teacher.dto';
import type { TeacherResponseDto } from '../../../application/dto/teachers/teacher-response.dto';

@Injectable()
export class PrismaTeachersRepository implements TeachersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTeacherDto): Promise<TeacherResponseDto> {
    // create person first
    const person = await this.prisma.person.create({
      data: {
        name: dto.person.name,
        last_name: dto.person.last_name,
      },
    });

    const teacher = await this.prisma.teachers.create({
      data: {
        id_person: person.id_person,
        id_attachments: dto.id_attachments ?? null,
        is_active: dto.is_active ?? true,
      },
      include: { person: true, attachment: true },
    });

    return this.mapTeacher(teacher);
  }

  findAll(): Promise<TeacherResponseDto[]> {
    return this.prisma.teachers
      .findMany({ include: { person: true, attachment: true } })
      .then((rows) => rows.map((r) => this.mapTeacher(r)));
  }

  async findById(id: number): Promise<TeacherResponseDto | undefined> {
    const t = await this.prisma.teachers.findUnique({ where: { id_teachers: id }, include: { person: true, attachment: true } });
    return t ? this.mapTeacher(t) : undefined; // ← convierte null → undefined
}

  async update(id: number, dto: UpdateTeacherDto): Promise<TeacherResponseDto | undefined> {
    const teacher = await this.prisma.teachers.findUnique({ where: { id_teachers: id } });
    if (!teacher) return undefined;

    // update person if needed
    if (dto.name !== undefined || dto.last_name !== undefined) {
      await this.prisma.person.update({ where: { id_person: teacher.id_person }, data: { name: dto.name ?? undefined, last_name: dto.last_name ?? undefined } });
    }

    const updated = await this.prisma.teachers.update({
      where: { id_teachers: id },
      data: {
        id_attachments: dto.id_attachments ?? teacher.id_attachments,
        is_active: dto.is_active ?? teacher.is_active,
      },
      include: { person: true, attachment: true },
    });

    return this.mapTeacher(updated);
  }

  async delete(id: number): Promise<boolean> {
    await this.prisma.teachers.delete({ where: { id_teachers: id } });
    return true;
  }

  enable(id: number): Promise<TeacherResponseDto> {
    return this.prisma.teachers
      .update({ where: { id_teachers: id }, data: { is_active: true }, include: { person: true, attachment: true } })
      .then((r) => this.mapTeacher(r));
  }

  disable(id: number): Promise<TeacherResponseDto> {
    return this.prisma.teachers
      .update({ where: { id_teachers: id }, data: { is_active: false }, include: { person: true, attachment: true } })
      .then((r) => this.mapTeacher(r));
  }

  private mapTeacher(row: any): TeacherResponseDto {
    return {
      id_teachers: row.id_teachers,
      id_person: row.id_person,
      person: row.person,
      id_attachments: row.id_attachments === null ? undefined : row.id_attachments,
      attachment: row.attachment ?? undefined,
      is_active: row.is_active,
    } as TeacherResponseDto;
  }
}
