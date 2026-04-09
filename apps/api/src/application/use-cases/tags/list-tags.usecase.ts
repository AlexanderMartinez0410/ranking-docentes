import { Inject, Injectable } from '@nestjs/common';
import { TagResponseDto } from '../../dto/tags/tag-response.dto';
import { TAGS_REPOSITORY } from '../../../infrastructure/repositories/tags/tags.repository';
import type { TagsRepository } from '../../../infrastructure/repositories/tags/tags.repository';

@Injectable()
export class ListTagsUseCase {
  constructor(
    @Inject(TAGS_REPOSITORY)
    private readonly repo: TagsRepository,
  ) {}

  execute(): Promise<TagResponseDto[]> {
    return this.repo.findAll();
  }
}
