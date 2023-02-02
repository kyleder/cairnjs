import { interfaces } from 'inversify';
import { CairnStack } from '../cairnStack';
import { IStone } from '../types';

export type InjectionAssertion = (requestor: IStone, dependency: IStone) => void;

export function getInjectionAssertionMiddleware(stack: CairnStack): interfaces.Middleware {
  return function applyInjectionAssertions(planAndResolve: interfaces.Next): interfaces.Next {
    return (args: interfaces.NextArgs) => {
      const assertions = stack.getAllInjectionAssertions();

      const nextContextInterceptor = args.contextInterceptor;
      args.contextInterceptor = (context: interfaces.Context) => {
        // Only apply the assertions if there is an injection operation being performed
        if (context.plan.rootRequest.childRequests.length > 0) {
          const requestor = stack.getDependencyDefinitionById(
            context.plan.rootRequest.target.serviceIdentifier as symbol,
          );

          context.plan.rootRequest.childRequests.forEach((request) => {
            const dependency = stack.getDependencyDefinitionById(
              request.target.serviceIdentifier as symbol,
            );

            // Run each dependency through the list of assertions
            for (const assertion of assertions) {
              // It is expected that an assertion with throw an error if the injection is not
              // allowed
              assertion(requestor, dependency);
            }
          });
        }
        return nextContextInterceptor(context);
      };
      return planAndResolve(args);
    };
  };
}
