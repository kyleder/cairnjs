import { MetadataService, TDependency } from '../dist';
import { Scope } from './metadata';

export class DependencyWrapper<D> {
  public readonly scope?: Scope = Scope.SINGLE;

  private singletonInstance?: D;

  constructor(public readonly prototype: TDependency, public readonly id: string) {}

  get instance(): D {
    if (!this.singletonInstance) {
      this.singletonInstance = new this.prototype();
    } else {
    }
    return this.singletonInstance;
  }
}
