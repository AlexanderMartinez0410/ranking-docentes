import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TagResponseDto } from '../../dto/tags/tag-response.dto';
import { TAGS_REPOSITORY } from '../../../infrastructure/repositories/tags/tags.repository';
import type { TagsRepository } from '../../../infrastructure/repositories/tags/tags.repository';

@Injectable()
export class EnableTagUseCase {
  constructor(
    @Inject(TAGS_REPOSITORY)
    private readonly repo: TagsRepository,
  ) {}

  async execute(id: number): Promise<TagResponseDto> {
    const tag = await this.repo.enable(id);
    if (!tag) {
      throw new NotFoundException('Tag no encontrado');
    }

    return tag;
  }
}
