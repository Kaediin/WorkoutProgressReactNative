export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  Abductor = 'ABDUCTOR',
  Abs = 'ABS',
  Adductor = 'ADDUCTOR',
  BackShoulders = 'BACK_SHOULDERS',
  Biceps = 'BICEPS',
  Calves = 'CALVES',
  Chest = 'CHEST',
  Forearms = 'FOREARMS',
  FrontShoulders = 'FRONT_SHOULDERS',
  Glutes = 'GLUTES',
  Hamstrings = 'HAMSTRINGS',
  Hands = 'HANDS',
  Lats = 'LATS',
  LowerBack = 'LOWER_BACK',
  Neck = 'NECK',
  Obliques = 'OBLIQUES',
  Quads = 'QUADS',
  Shins = 'SHINS',
  Triceps = 'TRICEPS',
  UpperBack = 'UPPER_BACK'
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
