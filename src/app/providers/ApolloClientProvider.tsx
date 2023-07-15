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
import QueueLink from 'apollo-link-queue';
import {RetryLink} from '@apollo/client/link/retry';
import {useNetInfo} from '@react-native-community/netinfo';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

const queueLink = new QueueLink();
const retryLink = new RetryLink();
const graphqlUri = Config.API_URI;

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
      graphQLErrors.forEach(graphQLError => {
        Sentry.withScope(scope => {
          scope.setTag('Component', 'ApolloClientProvider');
          scope.setTag('errorClass', 'graphQLError');

          scope.setExtra('graphQLError', graphQLError);

          Sentry.captureException(
            new Error(`Network request failed: ${graphQLError.message}`),
            {
              extra: {
                networkError,
                requestURL: operation.getContext().uri,
              },
            },
          );
        });
      });
    }

    if (networkError) {
      Sentry.withScope(scope => {
        scope.setTag('Component', 'ApolloClientProvider');
        scope.setTag('errorClass', 'networkError');

        scope.setExtra('networkError', networkError);

        Sentry.captureException(
          new Error(`Network request failed: ${networkError.message}`),
          {
            extra: {
              networkError,
              requestURL: operation.getContext().uri,
            },
          },
        );
      });
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
  const networkInfo = useNetInfo();

  useEffect(() => {
    if (networkInfo.isConnected === false) {
      // Start queueing requests
      queueLink.close();
    } else if (networkInfo.isConnected === true) {
      // Let requests pass (and execute all queued requests)
      queueLink.open();
    }
  }, [networkInfo]);

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
      from([
        retryLink,
        queueLink,
        withToken,
        errorLink,
        authMiddleware.concat(httpLink),
      ]),
    );
  }, []);

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
};

export default ApolloClientProvider;
