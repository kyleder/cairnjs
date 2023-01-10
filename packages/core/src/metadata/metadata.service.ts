function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class MetadataServiceStatic {
  public generateUniqueId(): string {
    return generateUuid();
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
