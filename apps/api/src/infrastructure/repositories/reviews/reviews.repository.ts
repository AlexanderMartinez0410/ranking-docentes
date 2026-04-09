import { CreateReviewDto } from '../../../application/dto/reviews/create-review.dto';
import { ReviewResponseDto } from '../../../application/dto/reviews/review-response.dto';
import { UpdateReviewDto } from '../../../application/dto/reviews/update-review.dto';

export const REVIEWS_REPOSITORY = Symbol('REVIEWS_REPOSITORY');

export interface ReviewsRepository {
  create(dto: CreateReviewDto): Promise<ReviewResponseDto>;
  findAll(): Promise<ReviewResponseDto[]>;
  findById(id: number): Promise<ReviewResponseDto | undefined>;
  update(id: number, dto: UpdateReviewDto): Promise<ReviewResponseDto | undefined>;
  delete(id: number): Promise<boolean>;
  findByUserTeacherPeriod(id_user: number, id_teacher: number, id_periods: number): Promise<ReviewResponseDto | undefined>;
  findByTeacher(id_teacher: number): Promise<ReviewResponseDto[]>;
  findByPeriod(id_periods: number): Promise<ReviewResponseDto[]>;
  findByTeacherAndPeriod(id_teacher: number, id_periods: number): Promise<ReviewResponseDto[]>;
}
