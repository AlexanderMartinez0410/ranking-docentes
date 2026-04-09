import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Public } from '../../auth/public.decorator';
import { USERS_REPOSITORY } from '../../infrastructure/repositories/users/users.repository';
import type { UsersRepository } from '../../infrastructure/repositories/users/users.repository';
import { LoginDto } from '../../application/dto/auth/login.dto';
import { ForgotPasswordDto } from '../../application/dto/auth/forgot-password.dto';
import { ResetPasswordDto } from '../../application/dto/auth/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepo: UsersRepository) {}

  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto) {
    const userRaw = await (this.usersRepo as any).findRawByUsername(dto.username);
    const user = userRaw ? this.usersRepo.findById(userRaw.id_users) : undefined;
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    // userRaw contains password_hash
    const passwordHash = userRaw.password_hash;
    if (!passwordHash) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const matches = await bcrypt.compare(dto.password, passwordHash);
    if (!matches) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    // Return basic sanitized user (without password)
    const sanitized = await (this.usersRepo.findById((userRaw as any).id_users));
    const secret = process.env.JWT_SECRET || 'change_this_secret';
    const token = jwt.sign({ sub: userRaw.id_users, username: userRaw.username }, secret, { expiresIn: '1h' });
    return { ok: true, user: sanitized, token };
  }

  @Post('forgot-password')
  @Public()
  async forgot(@Body() dto: ForgotPasswordDto) {
    const user = await this.usersRepo.findByUsername(dto.username);
    if (!user) return { ok: true }; // do not reveal

    const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    // @ts-ignore
    const userId = (user as any).id_users;
    await this.usersRepo.setPasswordResetToken(userId, token, expires);

    // In real app, send email. For now return token so dev can test.
    return { ok: true, token };
  }

  @Post('reset-password')
  @Public()
  async reset(@Body() dto: ResetPasswordDto) {
    const userRaw = await (this.usersRepo as any).findRawByResetToken(dto.token);
    const user = userRaw ? this.usersRepo.findById(userRaw.id_users) : undefined;
    if (!user) throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);

    // userRaw has expiry
    // @ts-ignore
    const expires: Date = userRaw.password_reset_expires;
    if (expires && new Date(expires) < new Date()) throw new HttpException('Token expired', HttpStatus.BAD_REQUEST);

    const hash = await bcrypt.hash(dto.newPassword, 10);
    const userId = userRaw.id_users;
    await this.usersRepo.updatePasswordById(userId, hash);

    return { ok: true };
  }
}
