import { intersection } from 'lodash';
import { MetadataService } from './metadata';
import { MODULE_OPTIONS } from './metadata/module.metadata';
import { Scanner } from './scanner';

export class CairnStack {
  private scanner: Scanner;
  private screens = [];
  private components = [];
  private services = [];
  private gateways = [];

  constructor(rootModule: any) {
    this.scanner = new Scanner();
    this.scan(rootModule);
  }

  private scan(module: any) {
    const isModule = this.scanner.isModule(module);
    if (!isModule) {
      throw new Error(
        `The root object must be a Module. Please apply the Module decorator to it and register all of the project's dependencies.`,
      );
    }

    this.scanner.scanForAllDependencies(module);

    const moduleKeys = this.getModuleMetadataKeys(module);

    for (let key of moduleKeys) {
      console.log(key, MetadataService.getMetadata(module, key));
    }

    // console.log('imports', this.getMetadata(module, 'imports'));
  }

  public getAllScreens() {
    return [];
  }

  private getModuleMetadataKeys(module: any): string[] {
    return intersection(MetadataService.getMetadataKeys(module), Object.values(MODULE_OPTIONS));
  }

  private getMetadata(target: any, metadataKey: string): any {
    console.log(MetadataService.getMetadataKeys(target));
    return MetadataService.getMetadata(target, metadataKey) || [];
  }
}
