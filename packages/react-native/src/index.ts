import { UuidService } from '@cairnjs/core';

export * from './cairnReactNativeApplication';
export * from './cairnReactNativeFactory';
export * from './decorators';
export * from './metadata';
export * from './types';

UuidService.setUuidFunction(() => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
});
