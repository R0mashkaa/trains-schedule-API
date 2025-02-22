import { getConfig } from '@app/config';
import { Logger, HttpStatus, HttpException } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(message: string, statusCode: HttpStatus, success: boolean = false) {
    super(
      {
        message,
        statusCode,
        success,
      },
      statusCode,
    );
  }
}

interface errorInterface {
  message: string;
  response: object;
  statusCode?: number;
  status?: number;
}

export async function errorHandler(functionName: string, model: string, error: errorInterface): Promise<never> {
  const isDevelopment = getConfig().node_env === 'development';

  Logger.error(`[${functionName}-${model}] error: ${error?.message}`);

  const statusCode: HttpStatus = error.statusCode ?? error.status ?? HttpStatus.INTERNAL_SERVER_ERROR;

  const message = isDevelopment
    ? `[${functionName}-${model}] error: ${error?.message}`
    : `Something went wrong! Please try again later or email us on support@email.mail`;

  throw new CustomHttpException(message, statusCode, false);
}
