import { CreateUserDto } from '../../../application/dto/users/create-user.dto';
import { UserResponseDto } from '../../../application/dto/users/user-response.dto';
import { UpdateUserDto } from '../../../application/dto/users/update-user.dto';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface UsersRepository {
  create(dto: CreateUserDto): Promise<UserResponseDto>;
  findAll(): Promise<UserResponseDto[]>;
  findById(id: number): Promise<UserResponseDto | undefined>;
  update(id: number, dto: UpdateUserDto): Promise<UserResponseDto | undefined>;
  delete(id: number): Promise<boolean>;
  enable(id: number): Promise<UserResponseDto | undefined>;
  disable(id: number): Promise<UserResponseDto | undefined>;
  findByUsername(username: string): Promise<UserResponseDto | undefined>;
  findRawByUsername(username: string): Promise<any | undefined>;
  setPasswordResetToken(id: number, token: string, expiresAt: Date): Promise<boolean>;
  findByResetToken(token: string): Promise<UserResponseDto | undefined>;
  findRawByResetToken(token: string): Promise<any | undefined>;
  updatePasswordById(id: number, passwordHash: string): Promise<boolean>;
}
