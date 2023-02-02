import { IStone } from 'packages/core/dist';
import { InjectionAssertion } from '../middleware';

export const isImported: InjectionAssertion = (requestor: IStone, dependency: IStone) => {
  console.log(`Asserting that ${requestor.name} can receive ${dependency.name}`);
};
