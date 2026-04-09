import { ApiProperty } from '@nestjs/swagger';

export class PeriodResponseDto {
  @ApiProperty({ example: 1 })
  id_periods!: number;

  @ApiProperty({ example: '2024-Q1' })
  name!: string;

  @ApiProperty({ example: true })
  is_active!: boolean;
}
