import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiPropertyOptional({ example: 'Ciencias' })
  name?: string;
}
