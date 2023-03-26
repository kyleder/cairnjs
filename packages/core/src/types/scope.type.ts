export enum Scope {
  /**
   * Singleton scope will initialize and cache an instance of the registered object and return the
   * same instance of that object on all subsequent requests for it.
   */
  Singleton = 'singleton',

  /**
   * Transient scope means that each time a request for an instance of the registered object is made
   * then a new instance of that object will be created and returned.
   */
  Transient = 'transient',

  Request = 'request',

  /**
   * Constant scope will set the provided value as a constant and return the same instance of that
   * constant every time. This is useful when defining non-class objects that can't be instantiated.
   */
  Constant = 'constant',
}

export type ScopeOptions = {
  scope?: Scope;
};
