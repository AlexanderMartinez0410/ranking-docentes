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
}
