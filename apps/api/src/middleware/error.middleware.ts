// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpStatus,
// } from '@nestjs/common';

// import { Request, Response } from 'express';
// import {
//   DatabaseErrorException,
//   InvalidPaginationParameterException,
// } from 'src/error';

// @Catch()
// export class GlobalErrorFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     let status = HttpStatus.INTERNAL_SERVER_ERROR;
//     let message = 'Internal server error';

//     if (exception instanceof InvalidPaginationParameterException) {
//       status = HttpStatus.BAD_REQUEST;
//       message = exception.message;
//     } else if (exception instanceof DatabaseErrorException) {
//       status = HttpStatus.INTERNAL_SERVER_ERROR;
//       message = exception.message;
//     }

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message,
//     });
//   }
// }

import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  DatabaseErrorException,
  InvalidPaginationParameterException,
} from 'src/error';

@Injectable()
export class GlobalErrorFilter implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction, err?: any): any {
    if (err) {
      const status = this.getStatus(err);
      const message = this.getMessage(err);

      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        message,
      });
    }

    next();
  }

  private getStatus(err: any): number {
    if (err instanceof InvalidPaginationParameterException) {
      return HttpStatus.BAD_REQUEST;
    } else if (err instanceof DatabaseErrorException) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    // Default to internal server error
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(err: any): string {
    return err instanceof Error ? err.message : 'Internal server error';
  }
}