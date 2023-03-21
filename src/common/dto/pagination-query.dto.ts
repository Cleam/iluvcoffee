import { IsOptional, IsPositive, Min } from 'class-validator';
export class PaginationQueryDto {
  @IsOptional()
  @Min(0, { message: `参数【offset】必须是正整数` })
  offset: number;

  @IsOptional()
  @IsPositive({ message: `参数【limit】必须是正整数` })
  limit: number;
}
