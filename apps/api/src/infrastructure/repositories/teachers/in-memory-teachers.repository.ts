import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from '../../../application/dto/teachers/create-teacher.dto';
import { UpdateTeacherDto } from '../../../application/dto/teachers/update-teacher.dto';
import { TeacherResponseDto, PersonResponseDto, AttachmentResponseDto } from '../../../application/dto/teachers/teacher-response.dto';
import { TeachersRepository } from './teachers.repository';

@Injectable()
export class InMemoryTeachersRepository implements TeachersRepository {
  private readonly teachers: TeacherResponseDto[] = [];
  private readonly persons: PersonResponseDto[] = [];
  private readonly attachments: AttachmentResponseDto[] = [];
  private teacherId = 1;
  private personId = 1;
  private attachmentId = 1;

  async create(dto: CreateTeacherDto): Promise<TeacherResponseDto> {
    // create person
    const person = {
      id_person: this.personId++,
      name: dto.person.name,
      last_name: dto.person.last_name,
    } as PersonResponseDto;
    this.persons.push(person);

    // find attachment if provided
    let attachment: AttachmentResponseDto | undefined = undefined;
    if (dto.id_attachments !== undefined) {
      attachment = this.attachments.find(a => a.id_attachments === dto.id_attachments);
    }

    const teacher: TeacherResponseDto = {
      id_teachers: this.teacherId++,
      id_person: person.id_person,
      person,
      id_attachments: attachment?.id_attachments,
      attachment,
      is_active: dto.is_active ?? true,
    };

    this.teachers.push(teacher);
    return teacher;
  }

  async findAll(): Promise<TeacherResponseDto[]> {
    return [...this.teachers];
  }

  async findById(id: number): Promise<TeacherResponseDto | undefined> {
    return this.teachers.find(t => t.id_teachers === id);
  }

  async update(id: number, dto: UpdateTeacherDto): Promise<TeacherResponseDto | undefined> {
    const teacher = await this.findById(id);
    if (!teacher) return undefined;

    if (dto.name !== undefined) teacher.person.name = dto.name;
    if (dto.last_name !== undefined) teacher.person.last_name = dto.last_name;
    if (dto.id_attachments !== undefined) {
      teacher.id_attachments = dto.id_attachments;
      teacher.attachment = this.attachments.find(a => a.id_attachments === dto.id_attachments);
    }
    if (dto.is_active !== undefined) teacher.is_active = dto.is_active;

    return teacher;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.teachers.findIndex(t => t.id_teachers === id);
    if (index === -1) return false;
    this.teachers.splice(index, 1);
    return true;
  }

  async enable(id: number): Promise<TeacherResponseDto | undefined> {
    const teacher = await this.findById(id);
    if (!teacher) return undefined;
    teacher.is_active = true;
    return teacher;
  }

  async disable(id: number): Promise<TeacherResponseDto | undefined> {
    const teacher = await this.findById(id);
    if (!teacher) return undefined;
    teacher.is_active = false;
    return teacher;
  }
}
