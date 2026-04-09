import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty({ example: 'Juan' })
  name!: string;

  @ApiProperty({ example: 'Pérez' })
  last_name!: string;
}

export class CreateTeacherDto {
  @ApiProperty({ type: CreatePersonDto })
  person!: CreatePersonDto;

  @ApiPropertyOptional({ example: 1 })
  id_attachments?: number;

  @ApiPropertyOptional({ example: true })
  is_active?: boolean;
}
