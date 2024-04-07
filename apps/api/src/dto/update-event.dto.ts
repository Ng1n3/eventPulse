import { ArrayUnique, IsDate, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditEventDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  about: string

  @IsOptional()
  @IsInt()
  price: number

  @IsDate()
  date: Date

  @IsOptional()
  @ArrayUnique()
  tags?: string[];

  @IsOptional()
  @ArrayUnique()
  speakers?: string[];

  @IsOptional()
  @ArrayUnique()
  platform?: string[];

  @IsOptional()
  @IsString()
  venue: string;

  @IsOptional()
  @IsInt()
  attendees: number;
}