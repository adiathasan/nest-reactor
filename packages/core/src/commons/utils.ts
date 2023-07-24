import { Type } from "@nestjs/common";

export const PartialType = <T>(classRef: Type<T>) => {
  return classRef as Type<Partial<T>>;
};
