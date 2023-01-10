import { GATEWAY_TYPE } from './gateway.metadata';
import { SERVICE_TYPE } from './service.metadata';

export const MODULE_TYPE = 'cairnjs.core.module';
export const MODULE_OPTIONS = {
  // exports: [],
  gateways: GATEWAY_TYPE,
  imports: MODULE_TYPE,
  services: SERVICE_TYPE,
};
