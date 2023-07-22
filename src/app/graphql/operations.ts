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
  LocalDateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  meHasActiveWorkout: Scalars['Boolean'];
  myExercises?: Maybe<Array<Exercise>>;
  myPreference?: Maybe<Preference>;
  myWorkouts?: Maybe<Array<Workout>>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  workoutById?: Maybe<Workout>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryWorkoutByIdArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  cognitoUser: CognitoUser;
  fid: Scalars['String'];
  id: Scalars['ID'];
};

export type CognitoUser = {
  __typename?: 'CognitoUser';
  email: Scalars['String'];
  family_name: Scalars['String'];
  gender: Scalars['String'];
  given_name: Scalars['String'];
  locale: Scalars['String'];
  name: Scalars['String'];
  nickname: Scalars['String'];
  zoneinfo: Scalars['String'];
};

export type Exercise = {
  __typename?: 'Exercise';
  id: Scalars['ID'];
  name: Scalars['String'];
  primaryMuscles?: Maybe<Array<Maybe<MuscleGroup>>>;
  secondaryMuscles?: Maybe<Array<Maybe<MuscleGroup>>>;
  user?: Maybe<User>;
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

export type Preference = {
  __typename?: 'Preference';
  defaultRepetitions?: Maybe<Scalars['Int']>;
  unit?: Maybe<WeightUnit>;
};

export enum WeightUnit {
  KG = 'KG',
  LBS = 'LBS'
}

export type Workout = {
  __typename?: 'Workout';
  active?: Maybe<Scalars['Boolean']>;
  endDateTime?: Maybe<Scalars['LocalDateTime']>;
  exerciseLogs: Array<ExerciseLog>;
  groupedExerciseLogs: Array<GroupedExerciseLog>;
  id: Scalars['ID'];
  muscleGroups: Array<MuscleGroup>;
  name: Scalars['String'];
  remark?: Maybe<Scalars['String']>;
  startDateTime?: Maybe<Scalars['LocalDateTime']>;
};

export type ExerciseLog = {
  __typename?: 'ExerciseLog';
  exercise: Exercise;
  id: Scalars['ID'];
  logDateTime: Scalars['LocalDateTime'];
  remark?: Maybe<Scalars['String']>;
  repetitions: Scalars['Float'];
  unit: WeightUnit;
  user: User;
  weightLeft: Scalars['Float'];
  weightRight: Scalars['Float'];
};

export type GroupedExerciseLog = {
  __typename?: 'GroupedExerciseLog';
  exercise: Exercise;
  logs: Array<ExerciseLog>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addExerciseLogToWorkout?: Maybe<Workout>;
  createExercise?: Maybe<Exercise>;
  createUser?: Maybe<User>;
  deleteExercise: Scalars['Boolean'];
  deleteWorkout?: Maybe<Scalars['Boolean']>;
  endWorkout?: Maybe<Workout>;
  meStartWorkout?: Maybe<Workout>;
  removeExerciseLog: Scalars['Boolean'];
  runFetchWorkoutsTask?: Maybe<Scalars['Boolean']>;
  updateExercise?: Maybe<Exercise>;
  updateMyPreference: Preference;
};


export type MutationAddExerciseLogToWorkoutArgs = {
  input?: InputMaybe<ExerciseLogInput>;
  workoutId: Scalars['ID'];
};


export type MutationCreateExerciseArgs = {
  input?: InputMaybe<ExerciseInput>;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutArgs = {
  id: Scalars['ID'];
};


export type MutationEndWorkoutArgs = {
  workoutId: Scalars['ID'];
  zonedDateTimeString: Scalars['String'];
};


export type MutationMeStartWorkoutArgs = {
  input: WorkoutInput;
};


export type MutationRemoveExerciseLogArgs = {
  exerciseLogId: Scalars['String'];
};


export type MutationUpdateExerciseArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<ExerciseInput>;
};


export type MutationUpdateMyPreferenceArgs = {
  input: PreferenceInput;
};

export type ExerciseLogInput = {
  exerciseId: Scalars['String'];
  remark?: InputMaybe<Scalars['String']>;
  repetitions: Scalars['Float'];
  unit: WeightUnit;
  weightLeft: Scalars['Float'];
  weightRight: Scalars['Float'];
  zonedDateTimeString: Scalars['String'];
};

export type ExerciseInput = {
  name: Scalars['String'];
  primaryMuscles?: InputMaybe<Array<InputMaybe<MuscleGroup>>>;
  secondaryMuscles?: InputMaybe<Array<InputMaybe<MuscleGroup>>>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  password: Scalars['String'];
};

export type WorkoutInput = {
  muscleGroups: Array<MuscleGroup>;
  name: Scalars['String'];
  remark?: InputMaybe<Scalars['String']>;
  zonedDateTime: Scalars['String'];
};

export type PreferenceInput = {
  defaultRepetitions?: InputMaybe<Scalars['Int']>;
  unit?: InputMaybe<WeightUnit>;
};

export type CognitoUserFragment = { __typename?: 'CognitoUser', name: string };

export type ExerciseFragment = { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null };

export type ExerciseLogFragment = { __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, weightLeft: number, weightRight: number, unit: WeightUnit, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null } };

export type GroupedExerciseLogFragment = { __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, weightLeft: number, weightRight: number, unit: WeightUnit, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null } }> };

export type PreferenceFragment = { __typename?: 'Preference', unit?: WeightUnit | null, defaultRepetitions?: number | null };

export type UserFragment = { __typename?: 'User', id: string, fid: string, cognitoUser: { __typename?: 'CognitoUser', name: string } };

export type WorkoutShortFragment = { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null };

export type WorkoutLongFragment = { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, weightLeft: number, weightRight: number, unit: WeightUnit, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null } }> }> };

export type CreateExerciseMutationVariables = Exact<{
  input?: InputMaybe<ExerciseInput>;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null } | null };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise: boolean };

export type UpdateExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ExerciseInput;
}>;


export type UpdateExerciseMutation = { __typename?: 'Mutation', updateExercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null } | null };

export type RemoveExerciseLogMutationVariables = Exact<{
  exerciseLogId: Scalars['String'];
}>;


export type RemoveExerciseLogMutation = { __typename?: 'Mutation', removeExerciseLog: boolean };

export type UpdatePreferenceMutationVariables = Exact<{
  input: PreferenceInput;
}>;


export type UpdatePreferenceMutation = { __typename?: 'Mutation', updateMyPreference: { __typename?: 'Preference', unit?: WeightUnit | null, defaultRepetitions?: number | null } };

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string } | null };

export type DeleteWorkoutMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkoutMutation = { __typename?: 'Mutation', deleteWorkout?: boolean | null };

export type EndWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  zonedDateTimeString: Scalars['String'];
}>;


export type EndWorkoutMutation = { __typename?: 'Mutation', endWorkout?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null } | null };

export type StartWorkoutMutationVariables = Exact<{
  input: WorkoutInput;
}>;


export type StartWorkoutMutation = { __typename?: 'Mutation', meStartWorkout?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null } | null };

export type MyExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyExercisesQuery = { __typename?: 'Query', myExercises?: Array<{ __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null }> | null };

export type MyPreferenceQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPreferenceQuery = { __typename?: 'Query', myPreference?: { __typename?: 'Preference', unit?: WeightUnit | null, defaultRepetitions?: number | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, fid: string, cognitoUser: { __typename?: 'CognitoUser', name: string } } | null };

export type AddExerciseLogToWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  input: ExerciseLogInput;
}>;


export type AddExerciseLogToWorkoutMutation = { __typename?: 'Mutation', addExerciseLogToWorkout?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, weightLeft: number, weightRight: number, unit: WeightUnit, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null } }> }> } | null };

export type HasActiveWorkoutQueryVariables = Exact<{ [key: string]: never; }>;


export type HasActiveWorkoutQuery = { __typename?: 'Query', meHasActiveWorkout: boolean };

export type WorkoutByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkoutByIdQuery = { __typename?: 'Query', workoutById?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, weightLeft: number, weightRight: number, unit: WeightUnit, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null } }> }> } | null };

export type WorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutsQuery = { __typename?: 'Query', myWorkouts?: Array<{ __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null }> | null };

export const PreferenceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Preference"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Preference"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultRepetitions"}}]}}]} as unknown as DocumentNode;
export const CognitoUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CognitoUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CognitoUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"cognitoUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CognitoUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CognitoUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CognitoUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode;
export const WorkoutShortFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode;
export const ExerciseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}}]} as unknown as DocumentNode;
export const ExerciseLogFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"weightLeft"}},{"kind":"Field","name":{"kind":"Name","value":"weightRight"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}}]} as unknown as DocumentNode;
export const GroupedExerciseLogFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"weightLeft"}},{"kind":"Field","name":{"kind":"Name","value":"weightRight"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}}]} as unknown as DocumentNode;
export const WorkoutLongFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"weightLeft"}},{"kind":"Field","name":{"kind":"Name","value":"weightRight"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}}]} as unknown as DocumentNode;
export const CreateExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExercise"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}}]} as unknown as DocumentNode;
export type CreateExerciseMutationFn = Apollo.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(CreateExerciseDocument, options);
      }
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = Apollo.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateExerciseMutation, CreateExerciseMutationVariables>;
export const DeleteExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExercise"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteExerciseMutationFn = Apollo.MutationFunction<DeleteExerciseMutation, DeleteExerciseMutationVariables>;

/**
 * __useDeleteExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseMutation, { data, loading, error }] = useDeleteExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseMutation, DeleteExerciseMutationVariables>(DeleteExerciseDocument, options);
      }
export type DeleteExerciseMutationHookResult = ReturnType<typeof useDeleteExerciseMutation>;
export type DeleteExerciseMutationResult = Apollo.MutationResult<DeleteExerciseMutation>;
export type DeleteExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>;
export const UpdateExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExercise"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}}]} as unknown as DocumentNode;
export type UpdateExerciseMutationFn = Apollo.MutationFunction<UpdateExerciseMutation, UpdateExerciseMutationVariables>;

/**
 * __useUpdateExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseMutation, { data, loading, error }] = useUpdateExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseMutation, UpdateExerciseMutationVariables>(UpdateExerciseDocument, options);
      }
export type UpdateExerciseMutationHookResult = ReturnType<typeof useUpdateExerciseMutation>;
export type UpdateExerciseMutationResult = Apollo.MutationResult<UpdateExerciseMutation>;
export type UpdateExerciseMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>;
export const RemoveExerciseLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeExerciseLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseLogId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeExerciseLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseLogId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseLogId"}}}]}]}}]} as unknown as DocumentNode;
export type RemoveExerciseLogMutationFn = Apollo.MutationFunction<RemoveExerciseLogMutation, RemoveExerciseLogMutationVariables>;

/**
 * __useRemoveExerciseLogMutation__
 *
 * To run a mutation, you first call `useRemoveExerciseLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveExerciseLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeExerciseLogMutation, { data, loading, error }] = useRemoveExerciseLogMutation({
 *   variables: {
 *      exerciseLogId: // value for 'exerciseLogId'
 *   },
 * });
 */
export function useRemoveExerciseLogMutation(baseOptions?: Apollo.MutationHookOptions<RemoveExerciseLogMutation, RemoveExerciseLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveExerciseLogMutation, RemoveExerciseLogMutationVariables>(RemoveExerciseLogDocument, options);
      }
export type RemoveExerciseLogMutationHookResult = ReturnType<typeof useRemoveExerciseLogMutation>;
export type RemoveExerciseLogMutationResult = Apollo.MutationResult<RemoveExerciseLogMutation>;
export type RemoveExerciseLogMutationOptions = Apollo.BaseMutationOptions<RemoveExerciseLogMutation, RemoveExerciseLogMutationVariables>;
export const UpdatePreferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePreference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreferenceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMyPreference"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Preference"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Preference"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Preference"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultRepetitions"}}]}}]} as unknown as DocumentNode;
export type UpdatePreferenceMutationFn = Apollo.MutationFunction<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>;

/**
 * __useUpdatePreferenceMutation__
 *
 * To run a mutation, you first call `useUpdatePreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferenceMutation, { data, loading, error }] = useUpdatePreferenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePreferenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>(UpdatePreferenceDocument, options);
      }
export type UpdatePreferenceMutationHookResult = ReturnType<typeof useUpdatePreferenceMutation>;
export type UpdatePreferenceMutationResult = Apollo.MutationResult<UpdatePreferenceMutation>;
export type UpdatePreferenceMutationOptions = Apollo.BaseMutationOptions<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>;
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
export const DeleteWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteWorkoutMutationFn = Apollo.MutationFunction<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;

/**
 * __useDeleteWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutMutation, { data, loading, error }] = useDeleteWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(DeleteWorkoutDocument, options);
      }
export type DeleteWorkoutMutationHookResult = ReturnType<typeof useDeleteWorkoutMutation>;
export type DeleteWorkoutMutationResult = Apollo.MutationResult<DeleteWorkoutMutation>;
export type DeleteWorkoutMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;
export const EndWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTimeString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}},{"kind":"Argument","name":{"kind":"Name","value":"zonedDateTimeString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTimeString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode;
export type EndWorkoutMutationFn = Apollo.MutationFunction<EndWorkoutMutation, EndWorkoutMutationVariables>;

/**
 * __useEndWorkoutMutation__
 *
 * To run a mutation, you first call `useEndWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endWorkoutMutation, { data, loading, error }] = useEndWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      zonedDateTimeString: // value for 'zonedDateTimeString'
 *   },
 * });
 */
export function useEndWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<EndWorkoutMutation, EndWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndWorkoutMutation, EndWorkoutMutationVariables>(EndWorkoutDocument, options);
      }
export type EndWorkoutMutationHookResult = ReturnType<typeof useEndWorkoutMutation>;
export type EndWorkoutMutationResult = Apollo.MutationResult<EndWorkoutMutation>;
export type EndWorkoutMutationOptions = Apollo.BaseMutationOptions<EndWorkoutMutation, EndWorkoutMutationVariables>;
export const StartWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meStartWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode;
export type StartWorkoutMutationFn = Apollo.MutationFunction<StartWorkoutMutation, StartWorkoutMutationVariables>;

/**
 * __useStartWorkoutMutation__
 *
 * To run a mutation, you first call `useStartWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startWorkoutMutation, { data, loading, error }] = useStartWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<StartWorkoutMutation, StartWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartWorkoutMutation, StartWorkoutMutationVariables>(StartWorkoutDocument, options);
      }
export type StartWorkoutMutationHookResult = ReturnType<typeof useStartWorkoutMutation>;
export type StartWorkoutMutationResult = Apollo.MutationResult<StartWorkoutMutation>;
export type StartWorkoutMutationOptions = Apollo.BaseMutationOptions<StartWorkoutMutation, StartWorkoutMutationVariables>;
export const MyExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}}]} as unknown as DocumentNode;

/**
 * __useMyExercisesQuery__
 *
 * To run a query within a React component, call `useMyExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyExercisesQuery(baseOptions?: Apollo.QueryHookOptions<MyExercisesQuery, MyExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyExercisesQuery, MyExercisesQueryVariables>(MyExercisesDocument, options);
      }
export function useMyExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyExercisesQuery, MyExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyExercisesQuery, MyExercisesQueryVariables>(MyExercisesDocument, options);
        }
export type MyExercisesQueryHookResult = ReturnType<typeof useMyExercisesQuery>;
export type MyExercisesLazyQueryHookResult = ReturnType<typeof useMyExercisesLazyQuery>;
export type MyExercisesQueryResult = Apollo.QueryResult<MyExercisesQuery, MyExercisesQueryVariables>;
export const MyPreferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myPreference"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myPreference"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Preference"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Preference"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Preference"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultRepetitions"}}]}}]} as unknown as DocumentNode;

/**
 * __useMyPreferenceQuery__
 *
 * To run a query within a React component, call `useMyPreferenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPreferenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPreferenceQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPreferenceQuery(baseOptions?: Apollo.QueryHookOptions<MyPreferenceQuery, MyPreferenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPreferenceQuery, MyPreferenceQueryVariables>(MyPreferenceDocument, options);
      }
export function useMyPreferenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPreferenceQuery, MyPreferenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPreferenceQuery, MyPreferenceQueryVariables>(MyPreferenceDocument, options);
        }
export type MyPreferenceQueryHookResult = ReturnType<typeof useMyPreferenceQuery>;
export type MyPreferenceLazyQueryHookResult = ReturnType<typeof useMyPreferenceLazyQuery>;
export type MyPreferenceQueryResult = Apollo.QueryResult<MyPreferenceQuery, MyPreferenceQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CognitoUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CognitoUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"cognitoUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CognitoUser"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AddExerciseLogToWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addExerciseLogToWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExerciseLogToWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutLong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"weightLeft"}},{"kind":"Field","name":{"kind":"Name","value":"weightRight"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}}]} as unknown as DocumentNode;
export type AddExerciseLogToWorkoutMutationFn = Apollo.MutationFunction<AddExerciseLogToWorkoutMutation, AddExerciseLogToWorkoutMutationVariables>;

/**
 * __useAddExerciseLogToWorkoutMutation__
 *
 * To run a mutation, you first call `useAddExerciseLogToWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseLogToWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseLogToWorkoutMutation, { data, loading, error }] = useAddExerciseLogToWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddExerciseLogToWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseLogToWorkoutMutation, AddExerciseLogToWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciseLogToWorkoutMutation, AddExerciseLogToWorkoutMutationVariables>(AddExerciseLogToWorkoutDocument, options);
      }
export type AddExerciseLogToWorkoutMutationHookResult = ReturnType<typeof useAddExerciseLogToWorkoutMutation>;
export type AddExerciseLogToWorkoutMutationResult = Apollo.MutationResult<AddExerciseLogToWorkoutMutation>;
export type AddExerciseLogToWorkoutMutationOptions = Apollo.BaseMutationOptions<AddExerciseLogToWorkoutMutation, AddExerciseLogToWorkoutMutationVariables>;
export const HasActiveWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"hasActiveWorkout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meHasActiveWorkout"}}]}}]} as unknown as DocumentNode;

/**
 * __useHasActiveWorkoutQuery__
 *
 * To run a query within a React component, call `useHasActiveWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasActiveWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasActiveWorkoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useHasActiveWorkoutQuery(baseOptions?: Apollo.QueryHookOptions<HasActiveWorkoutQuery, HasActiveWorkoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasActiveWorkoutQuery, HasActiveWorkoutQueryVariables>(HasActiveWorkoutDocument, options);
      }
export function useHasActiveWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasActiveWorkoutQuery, HasActiveWorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasActiveWorkoutQuery, HasActiveWorkoutQueryVariables>(HasActiveWorkoutDocument, options);
        }
export type HasActiveWorkoutQueryHookResult = ReturnType<typeof useHasActiveWorkoutQuery>;
export type HasActiveWorkoutLazyQueryHookResult = ReturnType<typeof useHasActiveWorkoutLazyQuery>;
export type HasActiveWorkoutQueryResult = Apollo.QueryResult<HasActiveWorkoutQuery, HasActiveWorkoutQueryVariables>;
export const WorkoutByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"workoutById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workoutById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutLong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"weightLeft"}},{"kind":"Field","name":{"kind":"Name","value":"weightRight"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}}]} as unknown as DocumentNode;

/**
 * __useWorkoutByIdQuery__
 *
 * To run a query within a React component, call `useWorkoutByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWorkoutByIdQuery(baseOptions: Apollo.QueryHookOptions<WorkoutByIdQuery, WorkoutByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutByIdQuery, WorkoutByIdQueryVariables>(WorkoutByIdDocument, options);
      }
export function useWorkoutByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutByIdQuery, WorkoutByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutByIdQuery, WorkoutByIdQueryVariables>(WorkoutByIdDocument, options);
        }
export type WorkoutByIdQueryHookResult = ReturnType<typeof useWorkoutByIdQuery>;
export type WorkoutByIdLazyQueryHookResult = ReturnType<typeof useWorkoutByIdLazyQuery>;
export type WorkoutByIdQueryResult = Apollo.QueryResult<WorkoutByIdQuery, WorkoutByIdQueryVariables>;
export const WorkoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"workouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myWorkouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode;

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