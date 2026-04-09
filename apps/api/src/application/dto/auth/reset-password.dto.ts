import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'token123' })
  token!: string;

  @ApiProperty({ example: 'newsecret' })
  newPassword!: string;
}
