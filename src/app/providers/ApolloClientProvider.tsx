import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

// const queueLink = new QueueLink();
// const retryLink = new RetryLink();
export const apolloClient = new ApolloClient({
  uri: 'http://192.168.178.15:5000/graphql',
  cache: new InMemoryCache(),
});

// const withToken = setContext(async () => {
//   const token = useAuthStore.getState().authToken;
//
//   if (!token) {
//     return {token: ''};
//   }
//   const decoded: CognitoJWTPayload = jwt_decode(token);
//   const tokenNotExpired = moment.unix(decoded.exp).isAfter(moment());
//
//   if (tokenNotExpired) {
//     return {token};
//   } else {
//     console.log(
//       'ApolloClientProvider: token is expired before request, refreshing token...',
//     );
//     const authSession = await Auth.currentSession();
//     if (authSession.isValid()) {
//       const newToken = authSession.getAccessToken().getJwtToken();
//       useAuthStore.setState({authToken: newToken});
//       return {token: newToken};
//     } else {
//       console.log(
//         'ApolloClientProvider: session is expired. Cannot create new token',
//       );
//     }
//   }
//
//   return {token: ''};
// });

// const errorLink: ApolloLink = onError(
//   ({graphQLErrors, networkError, operation, forward}) => {
//     if (graphQLErrors) {
//       graphQLErrors.forEach(graphQLError => {
//         console.log(graphQLError);
//       });
//     }
//
//     if (networkError) {
//       console.log(networkError);
//     }
//
//     return forward(operation);
//   },
// );

const ApolloClientProvider: React.FC<React.PropsWithChildren> = props => {
  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
};

export default ApolloClientProvider;
