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

export type Preference = {
  __typename?: 'Preference';
  defaultRepetitions?: Maybe<Scalars['Int']>;
  unit?: Maybe<WeightUnit>;
};

export enum WeightUnit {
  Kg = 'KG',
  Lbs = 'LBS'
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
  startDateTime?: Maybe<Scalars['LocalDateTime']>;
};

export type ExerciseLog = {
  __typename?: 'ExerciseLog';
  exercise: Exercise;
  id: Scalars['ID'];
  logDateTime: Scalars['LocalDateTime'];
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
  endWorkout?: Maybe<Workout>;
  meStartWorkout?: Maybe<Workout>;
  removeExerciseLog: Scalars['Boolean'];
  runFetchWorkoutsTask?: Maybe<Scalars['Boolean']>;
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


export type MutationUpdateMyPreferenceArgs = {
  input: PreferenceInput;
};

export type ExerciseLogInput = {
  exerciseId: Scalars['String'];
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
  zonedDateTime: Scalars['String'];
};

export type PreferenceInput = {
  defaultRepetitions?: InputMaybe<Scalars['Int']>;
  unit?: InputMaybe<WeightUnit>;
};
