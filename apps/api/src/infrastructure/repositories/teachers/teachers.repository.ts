import { CreateTeacherDto } from '../../../application/dto/teachers/create-teacher.dto';
import { UpdateTeacherDto } from '../../../application/dto/teachers/update-teacher.dto';
import { TeacherResponseDto } from '../../../application/dto/teachers/teacher-response.dto';

export const TEACHERS_REPOSITORY = Symbol('TEACHERS_REPOSITORY');

export interface TeachersRepository {
  create(dto: CreateTeacherDto): Promise<TeacherResponseDto>;
  findAll(): Promise<TeacherResponseDto[]>;
  findById(id: number): Promise<TeacherResponseDto | undefined>;
  update(id: number, dto: UpdateTeacherDto): Promise<TeacherResponseDto | undefined>;
  delete(id: number): Promise<boolean>;
  enable(id: number): Promise<TeacherResponseDto | undefined>;
  disable(id: number): Promise<TeacherResponseDto | undefined>;
}
