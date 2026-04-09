import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'jdoe' })
  username!: string;

  @ApiProperty({ example: 'hashed_password' })
  password_hash!: string;

  @ApiProperty({ example: 1 })
  id_person!: number;

  @ApiPropertyOptional({ example: 1 })
  id_attachments?: number;

  @ApiPropertyOptional({ example: 1 })
  id_rol?: number;

  @ApiPropertyOptional({ example: true })
  is_active?: boolean;
}
