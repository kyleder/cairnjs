import 'reflect-metadata';

export * from './gateway.metadata';
export * from './service.metadata';
export * from './metadata.service';
export * from './module.metadata';
export * from './inject.metadata';

export const DEPENDENCY_TYPE = 'cairnjs.type';
export const DEPENDENCY_ID = 'cairnjs.id';

export enum Scope {
  // A single instance is created and shared amongst all users.
  SINGLE,

  // A new instance is created for each use
  PRIVATE,
}
