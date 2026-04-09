import { ApiProperty } from '@nestjs/swagger';

export class PersonSmallDto {
  @ApiProperty({ example: 1 })
  id_person!: number;

  @ApiProperty({ example: 'Juan' })
  name!: string;

  @ApiProperty({ example: 'Pérez' })
  last_name!: string;
}

export class AttachmentResponseDto {
  @ApiProperty({ example: 1 })
  id_attachments!: number;

  @ApiProperty({ example: '/uploads/1.png' })
  path!: string;
}

export class RoleSmallDto {
  @ApiProperty({ example: 1 })
  id_rol!: number;

  @ApiProperty({ example: 'admin' })
  name!: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id_users!: number;

  @ApiProperty({ example: 'jdoe' })
  username!: string;

  @ApiProperty({ type: PersonSmallDto })
  person!: PersonSmallDto;

  @ApiProperty({ example: 1, required: false })
  id_attachments?: number;

  @ApiProperty({ type: AttachmentResponseDto, required: false })
  attachment?: AttachmentResponseDto;

  @ApiProperty({ type: RoleSmallDto, required: false })
  role?: RoleSmallDto;

  @ApiProperty({ example: true })
  is_active!: boolean;
}
