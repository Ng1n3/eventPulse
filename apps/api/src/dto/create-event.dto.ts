import { ArrayUnique, IsDate, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  about: string

  @IsNotEmpty()
  @IsInt()
  price: number

  @IsDate()
  date: Date

  @IsNotEmpty()
  @ArrayUnique()
  tags?: string[];

  @IsNotEmpty()
  @ArrayUnique()
  speakers?: string[];

  @IsNotEmpty()
  @ArrayUnique()
  platform?: string[];

  @IsNotEmpty()
  @IsString()
  venue: string;

  @IsNotEmpty()
  @IsString()
  eventUserId: string //userID

  @IsNotEmpty()
  @IsString()
  createdBy: string

  @IsNotEmpty()
  @IsString()
  subscribersId: string

  @IsNotEmpty()
  @IsInt()
  attendees: number;
}