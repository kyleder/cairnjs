import { UuidService } from '../services';

export class MetadataServiceStatic {
  public generateUniqueId(token: string): string {
    return UuidService.generateUniqueId();
  }

  public setMetadata(target: any, key: string, value: any): void {
    Reflect.defineMetadata(key, value, target);
  }

  public getMetadata(target: any, key: string): any {
    return Reflect.getMetadata(key, target);
  }

  public getMetadataKeys(target: any): string[] {
    return Reflect.getMetadataKeys(target);
  }
}

export const MetadataService = new MetadataServiceStatic();
