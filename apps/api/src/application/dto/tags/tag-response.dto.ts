import { ApiProperty } from '@nestjs/swagger';

export class TagResponseDto {
  @ApiProperty({ example: 1 })
  id_tags!: number;

  @ApiProperty({ example: 'Matemática' })
  name!: string;

  @ApiProperty({ example: true })
  is_active!: boolean;
}
