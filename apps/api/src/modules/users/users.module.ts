import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { USERS_REPOSITORY } from '../../infrastructure/repositories/users/users.repository';
import { PrismaUsersRepository } from '../../infrastructure/repositories/users/prisma-users.repository';
import { AuthController } from '../../interfaces/controllers/auth.controller';
import { UsersController } from '../../interfaces/controllers/users.controller';
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, AuthController],
  providers: [{ provide: USERS_REPOSITORY, useClass: PrismaUsersRepository }],
  exports: [{ provide: USERS_REPOSITORY, useClass: PrismaUsersRepository }],
})
export class UsersModule {}
