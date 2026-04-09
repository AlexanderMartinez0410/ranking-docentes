import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePeriodDto {
  @ApiPropertyOptional({ example: '2024-Q1', maxLength: 50 })
  name?: string;

  @ApiPropertyOptional({ example: true })
  is_active?: boolean;
}
