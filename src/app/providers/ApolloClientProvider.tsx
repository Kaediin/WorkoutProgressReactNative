import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import React, {useEffect} from 'react';
import {setContext} from '@apollo/client/link/context';
import useAuthStore from '../stores/authStore';
import {CognitoJWTPayload} from '../types/Auth';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import {Auth} from 'aws-amplify';
import {onError} from '@apollo/client/link/error';

const graphqlUri = 'http://192.168.178.15:5000/graphql';

export const apolloClient = new ApolloClient({
  link: from([]),
  cache: new InMemoryCache({
    typePolicies: {
      Part: {
        fields: {
          createdDate: (date: string): Date => new Date(date),
          updatedDate: (date: string): Date => new Date(date),
        },
      },
      CognitoUser: {
        merge: false,
      },
    },
  }),
});

const errorLink: ApolloLink = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
      console.log('Graphql Error');
      console.error(graphQLErrors);
    }
    if (networkError) {
      console.log('Network Error');
      console.error(networkError);
    }

    return forward(operation);
  },
);

const withToken = setContext(async () => {
  const token = useAuthStore.getState().authToken;

  if (!token) {
    return {token: ''};
  }
  const decoded: CognitoJWTPayload = jwt_decode(token);
  const tokenNotExpired = moment.unix(decoded.exp).isAfter(moment());

  if (tokenNotExpired) {
    return {token};
  } else {
    console.log(
      'ApolloClientProvider: token is expired before request, refreshing token...',
    );
    const authSession = await Auth.currentSession();
    if (authSession.isValid()) {
      const newToken = authSession.getAccessToken().getJwtToken();
      useAuthStore.setState({authToken: newToken});
      return {token: newToken};
    } else {
      console.log(
        'ApolloClientProvider: session is expired. Cannot create new token',
      );
    }
  }

  return {token: ''};
});

const ApolloClientProvider: React.FC<React.PropsWithChildren> = props => {
  useEffect(() => {
    const httpLink = createHttpLink({
      uri: graphqlUri,
    });
    const authMiddleware = setContext(async (_, {headers, ..._context}) => {
      const {token} = _context;

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
        ..._context,
      };
    });

    apolloClient.setLink(
      from([withToken, errorLink, authMiddleware.concat(httpLink)]),
    );
  }, []);

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
};

export default ApolloClientProvider;
