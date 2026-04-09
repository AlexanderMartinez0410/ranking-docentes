import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiPropertyOptional({ example: 8.50 })
  valuation?: number;

  @ApiPropertyOptional({ example: 'Comentario actualizado' })
  opinion?: string;

  @ApiPropertyOptional({ example: false })
  is_anonimys?: boolean;
}
