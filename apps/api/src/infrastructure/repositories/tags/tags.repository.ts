import { CreateTagDto } from '../../../application/dto/tags/create-tag.dto';
import { TagResponseDto } from '../../../application/dto/tags/tag-response.dto';
import { UpdateTagDto } from '../../../application/dto/tags/update-tag.dto';

export const TAGS_REPOSITORY = Symbol('TAGS_REPOSITORY');

export interface TagsRepository {
  create(dto: CreateTagDto): Promise<TagResponseDto>;
  findAll(): Promise<TagResponseDto[]>;
  findById(id: number): Promise<TagResponseDto | undefined>;
  update(id: number, dto: UpdateTagDto): Promise<TagResponseDto | undefined>;
  delete(id: number): Promise<boolean>;
  enable(id: number): Promise<TagResponseDto | undefined>;
  disable(id: number): Promise<TagResponseDto | undefined>;
}
