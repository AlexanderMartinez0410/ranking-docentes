import { Module } from '@nestjs/common';
import { RolesController } from '../../interfaces/controllers/roles.controller';
import { CreateRoleUseCase } from '../../application/use-cases/roles/create-role.usecase';
import { ListRolesUseCase } from '../../application/use-cases/roles/list-roles.usecase';
import { GetRoleUseCase } from '../../application/use-cases/roles/get-role.usecase';
import { UpdateRoleUseCase } from '../../application/use-cases/roles/update-role.usecase';
import { DeleteRoleUseCase } from '../../application/use-cases/roles/delete-role.usecase';
import { PrismaRolesRepository } from '../../infrastructure/repositories/roles/prisma-roles.repository';
import { ROLES_REPOSITORY } from '../../infrastructure/repositories/roles/roles.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [
    CreateRoleUseCase,
    ListRolesUseCase,
    GetRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    PrismaRolesRepository,
    {
      provide: ROLES_REPOSITORY,
      useExisting: PrismaRolesRepository,
    },
  ],
})
export class RolesModule {}
