import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from '../../application/dto/tags/create-tag.dto';
import { TagResponseDto } from '../../application/dto/tags/tag-response.dto';
import { UpdateTagDto } from '../../application/dto/tags/update-tag.dto';
import { CreateTagUseCase } from '../../application/use-cases/tags/create-tag.usecase';
import { DeleteTagUseCase } from '../../application/use-cases/tags/delete-tag.usecase';
import { DisableTagUseCase } from '../../application/use-cases/tags/disable-tag.usecase';
import { EnableTagUseCase } from '../../application/use-cases/tags/enable-tag.usecase';
import { GetTagUseCase } from '../../application/use-cases/tags/get-tag.usecase';
import { ListTagsUseCase } from '../../application/use-cases/tags/list-tags.usecase';
import { UpdateTagUseCase } from '../../application/use-cases/tags/update-tag.usecase';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly createTag: CreateTagUseCase,
    private readonly listTags: ListTagsUseCase,
    private readonly getTag: GetTagUseCase,
    private readonly updateTag: UpdateTagUseCase,
    private readonly deleteTag: DeleteTagUseCase,
    private readonly enableTag: EnableTagUseCase,
    private readonly disableTag: DisableTagUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear tag' })
  create(@Body() dto: CreateTagDto): Promise<TagResponseDto> {
    return this.createTag.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tags' })
  findAll(): Promise<TagResponseDto[]> {
    return this.listTags.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tag por id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TagResponseDto> {
    return this.getTag.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tag' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTagDto,
  ): Promise<TagResponseDto> {
    return this.updateTag.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tag' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteTag.execute(id);
  }

  @Patch(':id/enable')
  @ApiOperation({ summary: 'Habilitar tag' })
  enable(@Param('id', ParseIntPipe) id: number): Promise<TagResponseDto> {
    return this.enableTag.execute(id);
  }

  @Patch(':id/disable')
  @ApiOperation({ summary: 'Deshabilitar tag' })
  disable(@Param('id', ParseIntPipe) id: number): Promise<TagResponseDto> {
    return this.disableTag.execute(id);
  }
}
