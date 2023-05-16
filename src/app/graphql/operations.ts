import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  userByEmail?: Maybe<User>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  workouts?: Maybe<Array<Maybe<Workout>>>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['ID'];
  muscleGroups: Array<MuscleGroup>;
  name: Scalars['String'];
};

export enum MuscleGroup {
  ABDUCTOR = 'ABDUCTOR',
  ABS = 'ABS',
  ADDUCTOR = 'ADDUCTOR',
  BACK_SHOULDERS = 'BACK_SHOULDERS',
  BICEPS = 'BICEPS',
  CALVES = 'CALVES',
  CHEST = 'CHEST',
  FOREARMS = 'FOREARMS',
  FRONT_SHOULDERS = 'FRONT_SHOULDERS',
  GLUTES = 'GLUTES',
  HAMSTRINGS = 'HAMSTRINGS',
  HANDS = 'HANDS',
  LATS = 'LATS',
  LOWER_BACK = 'LOWER_BACK',
  NECK = 'NECK',
  OBLIQUES = 'OBLIQUES',
  QUADS = 'QUADS',
  SHINS = 'SHINS',
  TRICEPS = 'TRICEPS',
  UPPER_BACK = 'UPPER_BACK'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  meStartWorkout?: Maybe<Scalars['Boolean']>;
  runFetchWorkoutsTask?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  password: Scalars['String'];
};

export type UserFragment = { __typename?: 'User', id: string, firstName: string, middleName: string, lastName: string, email: string };

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string } | null };

export type WorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutsQuery = { __typename?: 'Query', workouts?: Array<{ __typename?: 'Workout', id: string, name: string } | null> | null };

export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const WorkoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"workouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useWorkoutsQuery__
 *
 * To run a query within a React component, call `useWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
      }
export function useWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
        }
export type WorkoutsQueryHookResult = ReturnType<typeof useWorkoutsQuery>;
export type WorkoutsLazyQueryHookResult = ReturnType<typeof useWorkoutsLazyQuery>;
export type WorkoutsQueryResult = Apollo.QueryResult<WorkoutsQuery, WorkoutsQueryVariables>;