import { Inject, Injectable } from '@nestjs/common';
import { ROLES_REPOSITORY } from '../../../infrastructure/repositories/roles/roles.repository';
import type { RolesRepository } from '../../../infrastructure/repositories/roles/roles.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly repo: RolesRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
