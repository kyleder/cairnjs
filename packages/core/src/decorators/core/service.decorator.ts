import { SERVICE_WATERMARK } from '../../metadata/';

export function Service(): ClassDecorator;
export function Service(prefix: string | string[]): ClassDecorator;

export function Service(prefixOrOptions?: string | string[]): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(SERVICE_WATERMARK, true, target);
  };
}
