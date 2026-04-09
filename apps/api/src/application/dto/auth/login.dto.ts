import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'jdoe' })
  username!: string;

  @ApiProperty({ example: 'secret' })
  password!: string;
}
