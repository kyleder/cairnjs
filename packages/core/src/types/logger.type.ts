import { IService } from './service.type';

export interface ILoggerService extends IService {
  debug(message: string): void;
  info(message: string): void;
  warning(message: string): void;
  error(message: string): void;
  critical(message: string): void;
}
