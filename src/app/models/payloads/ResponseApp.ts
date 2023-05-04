export class ResponseApp {
  body?: any;
  error!: Error;
}

export class Error {
  code!: number;
  message!: string;
}
