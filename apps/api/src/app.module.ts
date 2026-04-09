import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DatabaseModule } from './infrastructure/database/database.module';
import { TagsModule } from './modules/tags/tags.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { FilesModule } from './modules/files/files.module';
import { PeriodsModule } from './modules/periods/periods.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
	imports: [DatabaseModule, TagsModule, TeachersModule, FilesModule, PeriodsModule, RolesModule, UsersModule, ReviewsModule],
		providers: [
			{
				provide: APP_GUARD,
				useClass: JwtAuthGuard,
			},
		],
})
export class AppModule {}
