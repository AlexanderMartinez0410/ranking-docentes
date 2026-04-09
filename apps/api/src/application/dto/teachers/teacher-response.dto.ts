import { ApiProperty } from '@nestjs/swagger';

export class PersonResponseDto {
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

  @ApiProperty({ example: 'image' })
  type!: string;

  @ApiProperty({ example: '/uploads/1.png' })
  path!: string;
}

export class TeacherResponseDto {
  @ApiProperty({ example: 1 })
  id_teachers!: number;

  @ApiProperty({ example: 1 })
  id_person!: number;

  @ApiProperty({ type: PersonResponseDto })
  person!: PersonResponseDto;

  @ApiProperty({ example: 1 })
  id_attachments?: number;

  @ApiProperty({ type: AttachmentResponseDto, required: false })
  attachment?: AttachmentResponseDto;

  @ApiProperty({ example: true })
  is_active!: boolean;
}
