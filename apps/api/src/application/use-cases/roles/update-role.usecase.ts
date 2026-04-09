import { Inject, Injectable } from '@nestjs/common';
import { UpdateRoleDto } from '../../dto/roles/update-role.dto';
import { RoleResponseDto } from '../../dto/roles/role-response.dto';
import { ROLES_REPOSITORY } from '../../../infrastructure/repositories/roles/roles.repository';
import type { RolesRepository } from '../../../infrastructure/repositories/roles/roles.repository';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly repo: RolesRepository,
  ) {}

  execute(id: number, dto: UpdateRoleDto): Promise<RoleResponseDto | undefined> {
    return this.repo.update(id, dto);
  }
}
