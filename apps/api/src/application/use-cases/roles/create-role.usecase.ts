import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../../dto/roles/create-role.dto';
import { RoleResponseDto } from '../../dto/roles/role-response.dto';
import { ROLES_REPOSITORY } from '../../../infrastructure/repositories/roles/roles.repository';
import type { RolesRepository } from '../../../infrastructure/repositories/roles/roles.repository';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly repo: RolesRepository,
  ) {}

  execute(dto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.repo.create(dto);
  }
}
