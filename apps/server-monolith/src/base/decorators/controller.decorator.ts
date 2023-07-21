import { Controller, ControllerOptions } from '@nestjs/common';

import { ModuleRoutePath } from 'core/src/router/createRouter';

export interface RouteControllerOptions extends ControllerOptions {
  path: ModuleRoutePath;
}

export const RouteControllerV1 = (options: RouteControllerOptions) => {
  return Controller({
    ...options,
    version: '1',
  });
};
