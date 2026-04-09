import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from '../../dto/tags/create-tag.dto';
import { TagResponseDto } from '../../dto/tags/tag-response.dto';
import { TAGS_REPOSITORY } from '../../../infrastructure/repositories/tags/tags.repository';
import type { TagsRepository } from '../../../infrastructure/repositories/tags/tags.repository';

@Injectable()
export class CreateTagUseCase {
  constructor(
    @Inject(TAGS_REPOSITORY)
    private readonly repo: TagsRepository,
  ) {}

  execute(dto: CreateTagDto): Promise<TagResponseDto> {
    return this.repo.create(dto);
  }
}
