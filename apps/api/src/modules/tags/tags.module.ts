import { Module } from '@nestjs/common';
import { TagsController } from '../../interfaces/controllers/tags.controller';
import { CreateTagUseCase } from '../../application/use-cases/tags/create-tag.usecase';
import { DeleteTagUseCase } from '../../application/use-cases/tags/delete-tag.usecase';
import { DisableTagUseCase } from '../../application/use-cases/tags/disable-tag.usecase';
import { EnableTagUseCase } from '../../application/use-cases/tags/enable-tag.usecase';
import { GetTagUseCase } from '../../application/use-cases/tags/get-tag.usecase';
import { ListTagsUseCase } from '../../application/use-cases/tags/list-tags.usecase';
import { UpdateTagUseCase } from '../../application/use-cases/tags/update-tag.usecase';
import { PrismaTagsRepository } from '../../infrastructure/repositories/tags/prisma-tags.repository';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { TAGS_REPOSITORY } from '../../infrastructure/repositories/tags/tags.repository';

@Module({
  controllers: [TagsController],
  providers: [
    PrismaService,
    CreateTagUseCase,
    ListTagsUseCase,
    GetTagUseCase,
    UpdateTagUseCase,
    DeleteTagUseCase,
    EnableTagUseCase,
    DisableTagUseCase,
    PrismaTagsRepository,
    {
      provide: TAGS_REPOSITORY,
      useExisting: PrismaTagsRepository,
    },
  ],
})
export class TagsModule {}