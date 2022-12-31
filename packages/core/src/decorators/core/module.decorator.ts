import { MetadataService } from '../../metadata';
import { TScreen, IService, IStone, IModule } from '../../types';

export interface ModuleMetadata {
  imports?: Array<IStone | IModule>;
  screens?: TScreen[];
  services?: IService[];
}

export function Module(targetMetadata: ModuleMetadata): ClassDecorator {
  return function (target: any) {
    console.log(target);

    for (const property in targetMetadata) {
      if (property in targetMetadata) {
        MetadataService.setMetadata(target, property, (targetMetadata as any)[property]);
      }
    }
  };
}
