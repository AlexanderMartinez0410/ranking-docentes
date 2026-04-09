import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { TagsRepository } from './tags.repository';
import type { CreateTagDto } from '../../../application/dto/tags/create-tag.dto';
import type { UpdateTagDto } from '../../../application/dto/tags/update-tag.dto';
import type { TagResponseDto } from '../../../application/dto/tags/tag-response.dto';

@Injectable()
export class PrismaTagsRepository implements TagsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTagDto): Promise<TagResponseDto> {
    return this.prisma.tags.create({
      data: {
        name: dto.name,
        is_active: true, // ← valor por defecto al crear
      },
    });
  }

  findAll(): Promise<TagResponseDto[]> {
    return this.prisma.tags.findMany();
  }

  async findById(id: number): Promise<TagResponseDto | undefined> {
    const tag = await this.prisma.tags.findUnique({ where: { id_tags: id } });
    return tag ?? undefined; // ← convierte null → undefined
  }

  update(id: number, dto: UpdateTagDto): Promise<TagResponseDto> {
    return this.prisma.tags.update({
      where: { id_tags: id },
      data: dto,
    });
  }

  async delete(id: number): Promise<boolean> {
    await this.prisma.tags.delete({ where: { id_tags: id } });
    return true;
  }

  enable(id: number): Promise<TagResponseDto> {
    return this.prisma.tags.update({
      where: { id_tags: id },
      data: { is_active: true },
    });
  }

  disable(id: number): Promise<TagResponseDto> {
    return this.prisma.tags.update({
      where: { id_tags: id },
      data: { is_active: false },
    });
  }
}