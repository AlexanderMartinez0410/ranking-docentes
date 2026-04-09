import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { USERS_REPOSITORY } from '../../infrastructure/repositories/users/users.repository';
import type { UsersRepository } from '../../infrastructure/repositories/users/users.repository';
import { CreateUserDto } from '../../application/dto/users/create-user.dto';
import { UpdateUserDto } from '../../application/dto/users/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(USERS_REPOSITORY) private usersRepo: UsersRepository) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    // if a plain password is provided in dto.password_hash, hash it before saving
    if (dto.password_hash) {
      const hashed = await bcrypt.hash(dto.password_hash, 10);
      dto.password_hash = hashed;
    }
    return this.usersRepo.create(dto);
  }

  @Get()
  async findAll() {
    return this.usersRepo.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersRepo.findById(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersRepo.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersRepo.delete(Number(id));
  }
}
