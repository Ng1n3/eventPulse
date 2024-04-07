import { IsEmail, IsNotEmpty, IsString, IsOptional, ArrayNotEmpty, ArrayUnique, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  hash: string;

  @IsOptional()
  @IsString()
  hashedRt?: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsOptional()
  @IsString()
  passwordResetCode: string

  @IsOptional()
  @IsDate()
  passwordResetCodeExpiresAt: Date

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  // @IsOptional()
  // @ArrayNotEmpty()
  // userEvents?: string[]; // Assuming userEvents will be an array of UserEvent IDs

  @IsOptional()
  @ArrayUnique()
  tags?: string[];
}

export class SignUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  hash: string
}
