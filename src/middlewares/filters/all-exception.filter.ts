import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import axios from 'axios';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (axios.isAxiosError(exception)) {
      return response.status(exception.response.status).json({
        statusCode: exception.response.status,
        ...exception.response.data,
      });
    }
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const resp =
      exception instanceof HttpException
        ? exception.getResponse()
        : { error_message: exception.toString() };
    return response.status(status).json(resp);
  }
}
