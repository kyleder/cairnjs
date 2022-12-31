import { MetadataService } from './metadata';

export class CairnStack {
  private screens = [];
  private components = [];
  private services = [];
  private gateways = [];

  constructor(rootModule: any) {
    this.scan(rootModule);
  }

  private scan(module: any) {
    console.log(module);

    console.log('imports', this.getMetadata(module, 'imports'));
  }

  public getAllScreens() {
    return [];
  }

  private getMetadata(target: any, metadataKey: string): any {
    console.log(MetadataService.getMetadataKeys(target));
    return MetadataService.getMetadata(target, metadataKey) || [];
  }
}
