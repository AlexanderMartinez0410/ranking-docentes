import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from '../../application/dto/roles/create-role.dto';
import { RoleResponseDto } from '../../application/dto/roles/role-response.dto';
import { UpdateRoleDto } from '../../application/dto/roles/update-role.dto';
import { CreateRoleUseCase } from '../../application/use-cases/roles/create-role.usecase';
import { DeleteRoleUseCase } from '../../application/use-cases/roles/delete-role.usecase';
import { GetRoleUseCase } from '../../application/use-cases/roles/get-role.usecase';
import { ListRolesUseCase } from '../../application/use-cases/roles/list-roles.usecase';
import { UpdateRoleUseCase } from '../../application/use-cases/roles/update-role.usecase';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly createRole: CreateRoleUseCase,
    private readonly listRoles: ListRolesUseCase,
    private readonly getRole: GetRoleUseCase,
    private readonly updateRole: UpdateRoleUseCase,
    private readonly deleteRole: DeleteRoleUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear role' })
  create(@Body() dto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.createRole.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar roles' })
  findAll(): Promise<RoleResponseDto[]> {
    return this.listRoles.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener role por id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleResponseDto | undefined> {
    return this.getRole.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar role' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRoleDto): Promise<RoleResponseDto | undefined> {
    return this.updateRole.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar role' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteRole.execute(id);
  }
}
