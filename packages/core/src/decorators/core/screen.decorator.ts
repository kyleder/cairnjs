// Javascript doesn't natively support function decorators
import type { ComponentType } from 'react';
import { TScreen } from '../../types';
import { SCREEN_WATERMARK } from '../../metadata';

export function Screen(screen: TScreen): ComponentType<any> {
  Reflect.defineMetadata(SCREEN_WATERMARK, true, screen);
  return screen;
}
