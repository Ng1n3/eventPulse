import { IsEmail, IsNotEmpty, IsString, IsOptional, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  hash?: string;

  @IsOptional()
  @IsString()
  hashedRt?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  passwordResetCode: string

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @ArrayNotEmpty()
  userEvents?: string[]; // Assuming userEvents will be an array of UserEvent IDs

  @IsOptional()
  @ArrayUnique()
  @ArrayNotEmpty()
  preferredTags?: string[];
}