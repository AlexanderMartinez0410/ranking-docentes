import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTagDto } from '../../dto/tags/update-tag.dto';
import { TagResponseDto } from '../../dto/tags/tag-response.dto';
import { TAGS_REPOSITORY } from '../../../infrastructure/repositories/tags/tags.repository';
import type { TagsRepository } from '../../../infrastructure/repositories/tags/tags.repository';

@Injectable()
export class UpdateTagUseCase {
  constructor(
    @Inject(TAGS_REPOSITORY)
    private readonly repo: TagsRepository,
  ) {}

  async execute(id: number, dto: UpdateTagDto): Promise<TagResponseDto> {
    const tag = await this.repo.update(id, dto);
    if (!tag) {
      throw new NotFoundException('Tag no encontrado');
    }

    return tag;
  }
}
