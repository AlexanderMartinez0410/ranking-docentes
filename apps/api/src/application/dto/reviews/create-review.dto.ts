import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 8.50 })
  valuation!: number;

  @ApiProperty({ example: 'Excelente profesor, explica muy bien' })
  opinion!: string;

  @ApiProperty({ example: 1 })
  id_user!: number;

  @ApiProperty({ example: 1 })
  id_teacher!: number;

  @ApiProperty({ example: 1 })
  id_periods!: number;

  @ApiProperty({ example: false })
  is_anonimys?: boolean;
}
