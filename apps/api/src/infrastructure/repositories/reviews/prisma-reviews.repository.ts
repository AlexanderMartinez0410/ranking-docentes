import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewDto } from '../../../application/dto/reviews/create-review.dto';
import { UpdateReviewDto } from '../../../application/dto/reviews/update-review.dto';
import { ReviewResponseDto } from '../../../application/dto/reviews/review-response.dto';

@Injectable()
export class PrismaReviewsRepository implements ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDto(r: any): ReviewResponseDto {
    return {
      id_reviews: r.id_reviews,
      valuation: Number(r.valuation),
      opinion: r.opinion,
      is_anonimys: r.is_anonimys,
      id_user: r.id_user,
      id_teacher: r.id_teacher,
      id_periods: r.id_periods,
    } as ReviewResponseDto;
  }

  async create(dto: CreateReviewDto): Promise<ReviewResponseDto> {
    // enforce one review per user/teacher/period
    const exists = await (this.prisma as any).reviews.findFirst({
      where: { id_user: dto.id_user, id_teacher: dto.id_teacher, id_periods: dto.id_periods },
    });
    if (exists) {
      throw new ConflictException('User already reviewed this teacher for the period');
    }

    const created = await (this.prisma as any).reviews.create({
      data: {
        valuation: dto.valuation,
        opinion: dto.opinion,
        is_anonimys: dto.is_anonimys ?? false,
        id_user: dto.id_user,
        id_teacher: dto.id_teacher,
        id_periods: dto.id_periods,
      },
    });
    return this.mapToDto(created);
  }

  async findAll(): Promise<ReviewResponseDto[]> {
    const rows = await (this.prisma as any).reviews.findMany();
    return rows.map((r: any) => this.mapToDto(r));
  }

  async findById(id: number): Promise<ReviewResponseDto | undefined> {
    const r = await (this.prisma as any).reviews.findUnique({ where: { id_reviews: id } });
    return r ? this.mapToDto(r) : undefined;
  }

  async update(id: number, dto: UpdateReviewDto): Promise<ReviewResponseDto | undefined> {
    const updated = await (this.prisma as any).reviews.update({
      where: { id_reviews: id },
      data: {
        valuation: dto.valuation,
        opinion: dto.opinion,
        is_anonimys: dto.is_anonimys,
      },
    });
    return this.mapToDto(updated);
  }

  async delete(id: number): Promise<boolean> {
    await (this.prisma as any).reviews.delete({ where: { id_reviews: id } });
    return true;
  }

  async findByUserTeacherPeriod(id_user: number, id_teacher: number, id_periods: number): Promise<ReviewResponseDto | undefined> {
    const r = await (this.prisma as any).reviews.findFirst({ where: { id_user, id_teacher, id_periods } });
    return r ? this.mapToDto(r) : undefined;
  }

  async findByTeacher(id_teacher: number): Promise<ReviewResponseDto[]> {
    const rows = await (this.prisma as any).reviews.findMany({ where: { id_teacher } });
    return rows.map((r: any) => this.mapToDto(r));
  }

  async findByPeriod(id_periods: number): Promise<ReviewResponseDto[]> {
    const rows = await (this.prisma as any).reviews.findMany({ where: { id_periods } });
    return rows.map((r: any) => this.mapToDto(r));
  }

  async findByTeacherAndPeriod(id_teacher: number, id_periods: number): Promise<ReviewResponseDto[]> {
    const rows = await (this.prisma as any).reviews.findMany({ where: { id_teacher, id_periods } });
    return rows.map((r: any) => this.mapToDto(r));
  }
}
