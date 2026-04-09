import { Inject, Injectable } from '@nestjs/common';
import { RoleResponseDto } from '../../dto/roles/role-response.dto';
import { ROLES_REPOSITORY } from '../../../infrastructure/repositories/roles/roles.repository';
import type { RolesRepository } from '../../../infrastructure/repositories/roles/roles.repository';

@Injectable()
export class ListRolesUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly repo: RolesRepository,
  ) {}

  execute(): Promise<RoleResponseDto[]> {
    return this.repo.findAll();
  }
}
