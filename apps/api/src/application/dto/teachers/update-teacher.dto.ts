import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeacherDto {
  @ApiPropertyOptional({ example: 'Juan' })
  name?: string;

  @ApiPropertyOptional({ example: 'Pérez' })
  last_name?: string;

  @ApiPropertyOptional({ example: 2 })
  id_attachments?: number;

  @ApiPropertyOptional({ example: true })
  is_active?: boolean;

  @ApiPropertyOptional({ example: '/uploads/1681234-123.png' })
  attachmentUrl?: string;

  @ApiPropertyOptional({ example: 'image' })
  attachmentType?: string;
}
