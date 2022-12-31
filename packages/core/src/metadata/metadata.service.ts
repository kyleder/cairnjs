export class MetadataServiceStatic {
  public setMetadata(target: any, key: string, value: any) {
    console.log('setting metadata', key, value);
    Reflect.defineMetadata(key, value, target);
  }

  public getMetadata(target: any, key: string) {
    return Reflect.getMetadata(key, target);
  }

  public getMetadataKeys(target: any) {
    return Reflect.getMetadataKeys(target);
  }
}

export const MetadataService = new MetadataServiceStatic();
