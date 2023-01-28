import 'reflect-metadata';

export * from './gateway.metadata';
export * from './service.metadata';
export * from './metadata.service';
export * from './module.metadata';
export * from './inject.metadata';
export * from './event.metadata';

export const DEPENDENCY_TYPE = 'cairnjs.type';
export const DEPENDENCY_ID = 'cairnjs.id';
export const DEPENDENCY_SCOPE = 'cairnjs.dependency.scope';
export const DEPENDENCY_IS_GLOBAL = 'cairnjs.isGlobal';
