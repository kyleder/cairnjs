import {Hook} from '@cairnjs/react-native';
import {Inject} from '@cairnjs/core';
import {BoulderServerGateway} from '../boulderServer.gateway';

function useBoulderQueryHook(
  @Inject(BoulderServerGateway) boulderServer: BoulderServerGateway,
) {
  console.log('howdy!');
}

// export function useQuery<
//   TData = any,
//   TVariables extends OperationVariables = OperationVariables,
// >(
//   query: DocumentNode | TypedDocumentNode<TData, TVariables>,
//   options: QueryHookOptions<TData, TVariables> = Object.create(null),
// ): QueryResult<TData, TVariables> {
//   return useInternalState(
//     useApolloClient(options.client),
//     query,
//   ).useQuery(options);
// }

export const useBoulderQuery = Hook(useBoulderQueryHook);
