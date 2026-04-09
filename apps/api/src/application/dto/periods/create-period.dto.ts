import { ApiProperty } from '@nestjs/swagger';

export class CreatePeriodDto {
  @ApiProperty({ example: '2024-Q1', maxLength: 50 })
  name!: string;
}
