import { ApiProperty } from '@nestjs/swagger';

export class ReviewResponseDto {
  @ApiProperty({ example: 1 })
  id_reviews!: number;

  @ApiProperty({ example: 8.5 })
  valuation!: number;

  @ApiProperty({ example: 'Muy buen profesor' })
  opinion!: string;

  @ApiProperty({ example: false })
  is_anonimys!: boolean;

  @ApiProperty({ example: 1 })
  id_user!: number;

  @ApiProperty({ example: 1 })
  id_teacher!: number;

  @ApiProperty({ example: 1 })
  id_periods!: number;
}
