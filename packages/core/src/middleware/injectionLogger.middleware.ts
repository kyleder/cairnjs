import { interfaces } from 'inversify';
import { CairnStack } from '../cairnStack';
import { DEPENDENCY_TYPE, MetadataService } from '../metadata';

export function getInjectionLoggerMiddleware(stack: CairnStack): interfaces.Middleware {
  return function injectionLoggerMiddleware(planAndResolve: interfaces.Next): interfaces.Next {
    return (args: interfaces.NextArgs) => {
      let nextContextInterceptor = args.contextInterceptor;
      args.contextInterceptor = (context: interfaces.Context) => {
        if (context.plan.rootRequest.childRequests.length > 0) {
          const requestor = stack.getDependencyDefinitionById(
            context.plan.rootRequest.target.serviceIdentifier as symbol,
          );

          const requestorType = MetadataService.getMetadata(requestor, DEPENDENCY_TYPE);

          context.plan.rootRequest.childRequests.forEach((request) => {
            const dependency = stack.getDependencyDefinitionById(
              request.target.serviceIdentifier as symbol,
            );
            const dependencyType = MetadataService.getMetadata(dependency, DEPENDENCY_TYPE);

            // console.log(
            //   `${requestor.name}(${requestorType}), ${dependency.name}(${dependencyType})`,
            // );
          });
        }
        return nextContextInterceptor(context);
      };
      return planAndResolve(args);
    };
  };
}
