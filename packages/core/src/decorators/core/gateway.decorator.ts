export function Gateway(): ClassDecorator;
export function Gateway(prefix: string | string[]): ClassDecorator;

export function Gateway(prefixOrOptions?: string | string[]): ClassDecorator {
  return (target: any) => {
    // Reflect.defineMetadata();
  };
}
