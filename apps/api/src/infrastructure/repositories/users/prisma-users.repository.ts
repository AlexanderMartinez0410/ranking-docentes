import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from '../../../application/dto/users/create-user.dto';
import { UpdateUserDto } from '../../../application/dto/users/update-user.dto';
import { UserResponseDto } from '../../../application/dto/users/user-response.dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDto(user: any): UserResponseDto {
    return {
      id_users: user.id_users,
      username: user.username,
      person: user.person
        ? {
            id_person: user.person.id_person,
            name: user.person.name,
            last_name: user.person.last_name,
          }
        : undefined,
      id_attachments: user.id_attachments,
      attachment: user.attachment ? { id_attachments: user.attachment.id_attachments, path: user.attachment.path } : undefined,
      role: user.role ? { id_rol: user.role.id_rol, name: user.role.name } : undefined,
      is_active: user.is_active,
    } as UserResponseDto;
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const created = await (this.prisma as any).users.create({
      data: {
        username: dto.username,
        password_hash: dto.password_hash,
        is_active: dto.is_active ?? true,
        id_person: dto.id_person,
        id_attachments: dto.id_attachments ?? null,
        id_rol: dto.id_rol ?? null,
      },
      include: { person: true, attachment: true, role: true },
    });

    return this.mapToDto(created);
  }

  async findByUsername(username: string): Promise<UserResponseDto | undefined> {
    const user = await (this.prisma as any).users.findUnique({ where: { username } , include: { person: true, attachment: true, role: true } });
    return user ? this.mapToDto(user) : undefined;
  }

  async findRawByUsername(username: string): Promise<any | undefined> {
    const user = await (this.prisma as any).users.findUnique({ where: { username } });
    return user ?? undefined;
  }

  async setPasswordResetToken(id: number, token: string, expiresAt: Date): Promise<boolean> {
    await (this.prisma as any).users.update({ where: { id_users: id }, data: { password_reset_token: token, password_reset_expires: expiresAt } });
    return true;
  }

  async findByResetToken(token: string): Promise<UserResponseDto | undefined> {
    const user = await (this.prisma as any).users.findFirst({ where: { password_reset_token: token }, include: { person: true, attachment: true, role: true } });
    return user ? this.mapToDto(user) : undefined;
  }

  async findRawByResetToken(token: string): Promise<any | undefined> {
    const user = await (this.prisma as any).users.findFirst({ where: { password_reset_token: token } });
    return user ?? undefined;
  }

  async updatePasswordById(id: number, passwordHash: string): Promise<boolean> {
    await (this.prisma as any).users.update({ where: { id_users: id }, data: { password_hash: passwordHash, password_reset_token: null, password_reset_expires: null } });
    return true;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await (this.prisma as any).users.findMany({
      include: { person: true, attachment: true, role: true },
    });
    return users.map((u: any) => this.mapToDto(u));
  }

  async findById(id: number): Promise<UserResponseDto | undefined> {
    const user = await (this.prisma as any).users.findUnique({
      where: { id_users: id },
      include: { person: true, attachment: true, role: true },
    });
    return user ? this.mapToDto(user) : undefined;
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto | undefined> {
    const updated = await (this.prisma as any).users.update({
      where: { id_users: id },
      data: {
        username: dto.username,
        password_hash: dto.password_hash,
        is_active: dto.is_active,
        id_person: dto.id_person,
        id_attachments: dto.id_attachments,
        id_rol: dto.id_rol,
      },
      include: { person: true, attachment: true, role: true },
    });
    return this.mapToDto(updated);
  }

  async delete(id: number): Promise<boolean> {
    await (this.prisma as any).users.delete({ where: { id_users: id } });
    return true;
  }

  async enable(id: number): Promise<UserResponseDto | undefined> {
    const updated = await (this.prisma as any).users.update({
      where: { id_users: id },
      data: { is_active: true },
      include: { person: true, attachment: true, role: true },
    });
    return this.mapToDto(updated);
  }

  async disable(id: number): Promise<UserResponseDto | undefined> {
    const updated = await (this.prisma as any).users.update({
      where: { id_users: id },
      data: { is_active: false },
      include: { person: true, attachment: true, role: true },
    });
    return this.mapToDto(updated);
  }
}
