import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TAGS_REPOSITORY } from '../../../infrastructure/repositories/tags/tags.repository';
import type { TagsRepository } from '../../../infrastructure/repositories/tags/tags.repository';

@Injectable()
export class DeleteTagUseCase {
  constructor(
    @Inject(TAGS_REPOSITORY)
    private readonly repo: TagsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const deleted = await this.repo.delete(id);
    if (!deleted) {
      throw new NotFoundException('Tag no encontrado');
    }
  }
}
