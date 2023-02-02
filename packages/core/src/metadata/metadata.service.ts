export class MetadataServiceStatic {
  public setMetadata(target: any, key: string, value: any): void {
    Reflect.defineMetadata(key, value, target);
  }

  public getMetadata<T>(target: any, key: string): T {
    return Reflect.getMetadata(key, target);
  }

  public getMetadataKeys(target: any): string[] {
    return Reflect.getMetadataKeys(target);
  }
}

export const MetadataService = new MetadataServiceStatic();
