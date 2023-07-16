import { Controller, ControllerOptions } from '@nestjs/common';

export const RouteControllerV1 = (options: ControllerOptions) => {
  return Controller({
    ...options,
    version: '1',
  });
};
