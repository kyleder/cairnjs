export interface IStone<T = any> extends Function {
  new (...args: never[]): T;
  type?: string;
}
