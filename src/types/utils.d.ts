declare module Utils {

  type Logger = typeof import('../utils/Logger').Logger

  type Environment = () => void;

  type Id = Readonly<{
    makeId: () => string;
    isValidId: (id: string) => boolean;
  }>

  type IsValidName = (name: string) => boolean;

  type IsValidEmail = (email: string) => boolean;

  type RESTController = (httpRequest: import('express').Request, usecase?: string) => Promise<any>;

  interface ApiResponse<T> {
    statusCode: number;
    status: string;
    message: string;
    data: T[];
    count?: number;
  }
}
