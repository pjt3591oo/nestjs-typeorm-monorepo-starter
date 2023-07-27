import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpStatus,
} from '@nestjs/common';

export interface ErrorInfo {
  code: string;
  desc?: string;
}

export class FailResponse {
  readonly result: string;
  readonly error: ErrorInfo;

  constructor(error: ErrorInfo) {
    this.result = 'FAIL';
    this.error = error;
  }
}

@Catch()
export class MyServiceExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const failRes: FailResponse = new FailResponse({
      code: `${error.context as string}__${error.type as string}`,
      desc: error.message,
    });

    /*
      필요하면 로깅추가
      const request = host.switchToHttp().getRequest();
      console.log(request, '데이터에 의해서')
      console.log(failRes, 'exception 발생')
    */

    host.switchToHttp().getResponse().status(HttpStatus.OK).json(failRes);
  }
}
