import { v4 as uuid } from 'uuid';

type UuidFunction = () => string;

export class UuidService {
  static uuid: UuidFunction = uuid;

  static setUuidFunction(newUuid: UuidFunction): void {
    this.uuid = newUuid;
  }

  static generateUniqueId(): string {
    return this.uuid();
  }
}
