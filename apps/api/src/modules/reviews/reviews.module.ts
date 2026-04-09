import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { REVIEWS_REPOSITORY } from '../../infrastructure/repositories/reviews/reviews.repository';
import { PrismaReviewsRepository } from '../../infrastructure/repositories/reviews/prisma-reviews.repository';
import { ReviewsController } from '../../interfaces/controllers/reviews.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ReviewsController],
  providers: [{ provide: REVIEWS_REPOSITORY, useClass: PrismaReviewsRepository }],
  exports: [{ provide: REVIEWS_REPOSITORY, useClass: PrismaReviewsRepository }],
})
export class ReviewsModule {}
