import { CreateRoleDto } from '../../../application/dto/roles/create-role.dto';
import { RoleResponseDto } from '../../../application/dto/roles/role-response.dto';
import { UpdateRoleDto } from '../../../application/dto/roles/update-role.dto';

export const ROLES_REPOSITORY = Symbol('ROLES_REPOSITORY');

export interface RolesRepository {
  create(dto: CreateRoleDto): Promise<RoleResponseDto>;
  findAll(): Promise<RoleResponseDto[]>;
  findById(id: number): Promise<RoleResponseDto | undefined>;
  update(id: number, dto: UpdateRoleDto): Promise<RoleResponseDto | undefined>;
  delete(id: number): Promise<boolean>;
}
