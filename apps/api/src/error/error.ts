import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class InvalidPaginationParameterException extends BadRequestException {
  constructor(message: string = 'Invalid pagination parameters') {
    super(message);
  }
}

export class DatabaseErrorException extends InternalServerErrorException {
  constructor(message: string = 'Database error') {
    super(message);
  }
}
