import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Inject, ConflictException } from '@nestjs/common';
import { REVIEWS_REPOSITORY  } from '../../infrastructure/repositories/reviews/reviews.repository';
import { CreateReviewDto } from '../../application/dto/reviews/create-review.dto';
import { UpdateReviewDto } from '../../application/dto/reviews/update-review.dto';
import type { ReviewsRepository } from '../../infrastructure/repositories/reviews/reviews.repository';

@Controller('reviews')
export class ReviewsController {
  constructor(@Inject(REVIEWS_REPOSITORY) private reviewsRepo: ReviewsRepository) {}

  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewsRepo.create(dto);
  }

  @Get()
  async findAll() {
    return this.reviewsRepo.findAll();
  }

  @Get('teacher/:id')
  async findByTeacher(@Param('id') id: string) {
    return this.reviewsRepo.findByTeacher(Number(id));
  }

  @Get('period/:id')
  async findByPeriod(@Param('id') id: string) {
    return this.reviewsRepo.findByPeriod(Number(id));
  }

  @Get('teacher/:teacherId/period/:periodId')
  async findByTeacherAndPeriod(@Param('teacherId') teacherId: string, @Param('periodId') periodId: string) {
    return this.reviewsRepo.findByTeacherAndPeriod(Number(teacherId), Number(periodId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewsRepo.findById(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewsRepo.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewsRepo.delete(Number(id));
  }
}
