import { Module } from '@nestjs/common';
import { TagsModule } from './modules/tags/tags.module';
import { TeachersModule } from './modules/teachers/teachers.module';

@Module({
	imports: [TagsModule, TeachersModule],
})
export class AppModule {}
