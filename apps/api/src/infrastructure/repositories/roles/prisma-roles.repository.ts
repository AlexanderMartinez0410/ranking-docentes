import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { RolesRepository } from './roles.repository';
import type { CreateRoleDto } from '../../../application/dto/roles/create-role.dto';
import type { UpdateRoleDto } from '../../../application/dto/roles/update-role.dto';
import type { RoleResponseDto } from '../../../application/dto/roles/role-response.dto';

@Injectable()
export class PrismaRolesRepository implements RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateRoleDto): Promise<RoleResponseDto> {
    return (this.prisma as any).roles.create({ data: { name: dto.name } });
  }

  findAll(): Promise<RoleResponseDto[]> {
    return (this.prisma as any).roles.findMany();
  }

  async findById(id: number): Promise<RoleResponseDto | undefined> {
    const row = await (this.prisma as any).roles.findUnique({ where: { id_rol: id } });
    return row ?? undefined;
  }

  update(id: number, dto: UpdateRoleDto): Promise<RoleResponseDto> {
    return (this.prisma as any).roles.update({ where: { id_rol: id }, data: dto });
  }

  async delete(id: number): Promise<boolean> {
    await (this.prisma as any).roles.delete({ where: { id_rol: id } });
    return true;
  }
}
