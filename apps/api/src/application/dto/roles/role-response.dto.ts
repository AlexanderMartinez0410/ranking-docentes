import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ example: 1 })
  id_rol!: number;

  @ApiProperty({ example: 'admin' })
  name!: string;
}
