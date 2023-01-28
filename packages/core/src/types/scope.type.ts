export enum Scope {
  Singleton = 'singleton',
  Transient = 'transient',
  Request = 'request',
}

export type ScopeOptions = {
  scope?: Scope;
};
