import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'jdoe' })
  username?: string;

  @ApiPropertyOptional({ example: 'hashed_password' })
  password_hash?: string;

  @ApiPropertyOptional({ example: 1 })
  id_person?: number;

  @ApiPropertyOptional({ example: 1 })
  id_attachments?: number;

  @ApiPropertyOptional({ example: 1 })
  id_rol?: number;

  @ApiPropertyOptional({ example: true })
  is_active?: boolean;
}
