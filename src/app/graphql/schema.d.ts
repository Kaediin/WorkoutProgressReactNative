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

export type CognitoUser = {
  __typename?: 'CognitoUser';
  createdDate?: Maybe<Scalars['LocalDateTime']>;
  email: Scalars['String'];
  family_name: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  given_name: Scalars['String'];
  locale: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nickname: Scalars['String'];
  userName: Scalars['String'];
  zoneinfo: Scalars['String'];
};

export type Exercise = {
  __typename?: 'Exercise';
  defaultAppliedWeight?: Maybe<LogValue>;
  id: Scalars['ID'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryMuscles?: Maybe<Array<Maybe<MuscleGroup>>>;
  secondaryMuscles?: Maybe<Array<Maybe<MuscleGroup>>>;
  user?: Maybe<User>;
};

export type ExerciseInput = {
  defaultAppliedWeight?: InputMaybe<LogValueInput>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryMuscles?: InputMaybe<Array<InputMaybe<MuscleGroup>>>;
  secondaryMuscles?: InputMaybe<Array<InputMaybe<MuscleGroup>>>;
};

export type ExerciseLineChartData = {
  __typename?: 'ExerciseLineChartData';
  logs: Array<ExerciseLog>;
  monthLabel: Scalars['String'];
};

export type ExerciseLog = {
  __typename?: 'ExerciseLog';
  exercise: Exercise;
  id: Scalars['ID'];
  logDateTime: Scalars['LocalDateTime'];
  logValue: LogValue;
  remark?: Maybe<Scalars['String']>;
  repetitions: Scalars['Float'];
  user: User;
  warmup?: Maybe<Scalars['Boolean']>;
  workout: Workout;
};

export type ExerciseLogInput = {
  exerciseId: Scalars['String'];
  logValue: LogValueInput;
  remark?: InputMaybe<Scalars['String']>;
  repetitions: Scalars['Float'];
  warmup: Scalars['Boolean'];
  zonedDateTimeString: Scalars['String'];
};

export enum ExternalHealthProvider {
  AppleHealth = 'APPLE_HEALTH'
}

export type ExternalHealthProviderData = {
  __typename?: 'ExternalHealthProviderData';
  appleHealthId: Scalars['ID'];
  provider: ExternalHealthProvider;
};

export type ExternalHealthProviderDataInput = {
  appleHealthId: Scalars['ID'];
  provider: ExternalHealthProvider;
};

export type GroupedExerciseLog = {
  __typename?: 'GroupedExerciseLog';
  exercise: Exercise;
  logs: Array<ExerciseLog>;
};

export enum LogUnit {
  Kg = 'KG',
  Km = 'KM',
  Lbs = 'LBS',
  Mi = 'MI',
  Min = 'MIN',
  Sec = 'SEC'
}

export type LogValue = {
  __typename?: 'LogValue';
  base: Scalars['Int'];
  fraction?: Maybe<Scalars['Int']>;
  unit: LogUnit;
};

export type LogValueInput = {
  base: Scalars['Int'];
  fraction?: InputMaybe<Scalars['Int']>;
  unit: LogUnit;
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

export type MuscleGroupChartData = {
  __typename?: 'MuscleGroupChartData';
  color: Scalars['String'];
  count: Scalars['Int'];
  muscleGroup: MuscleGroup;
};

export type Mutation = {
  __typename?: 'Mutation';
  addExerciseLog?: Maybe<Workout>;
  /** Add external health provider data to workout */
  addExternalHealthProviderData: Workout;
  addOnboardingExercises?: Maybe<Scalars['Boolean']>;
  completeOnboarding: User;
  createExercise?: Maybe<Exercise>;
  createUser?: Maybe<User>;
  deleteExercise: Scalars['Boolean'];
  /** Delete workout by ID */
  deleteWorkout?: Maybe<Scalars['Boolean']>;
  /** End workout by ID */
  endWorkout?: Maybe<Workout>;
  /** Start a new workout for me */
  meStartWorkout?: Maybe<Workout>;
  reLogLatestLog?: Maybe<Workout>;
  reLogLog?: Maybe<Workout>;
  removeExerciseLog: Scalars['Boolean'];
  /** Restart workout by ID. This only removes end date and set active to false */
  restartWorkout: Workout;
  runFetchWorkoutsTask?: Maybe<Scalars['Boolean']>;
  updateExercise?: Maybe<Exercise>;
  updateExerciseLog?: Maybe<Workout>;
  updateMyPreference: Preference;
  /** Update workout by ID */
  updateWorkout: Workout;
};


export type MutationAddExerciseLogArgs = {
  autoAdjust: Scalars['Boolean'];
  input: ExerciseLogInput;
  workoutId: Scalars['ID'];
};


export type MutationAddExternalHealthProviderDataArgs = {
  input: ExternalHealthProviderDataInput;
  workoutId: Scalars['ID'];
};


export type MutationAddOnboardingExercisesArgs = {
  ids: Array<Scalars['String']>;
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


export type MutationReLogLatestLogArgs = {
  autoAdjust: Scalars['Boolean'];
  workoutId: Scalars['ID'];
  zonedDateTimeString: Scalars['String'];
};


export type MutationReLogLogArgs = {
  input: ExerciseLogInput;
  workoutId: Scalars['ID'];
};


export type MutationRemoveExerciseLogArgs = {
  autoAdjust: Scalars['Boolean'];
  exerciseLogId: Scalars['String'];
};


export type MutationRestartWorkoutArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateExerciseArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<ExerciseInput>;
};


export type MutationUpdateExerciseLogArgs = {
  exerciseLogId: Scalars['ID'];
  input: ExerciseLogInput;
};


export type MutationUpdateMyPreferenceArgs = {
  input: PreferenceInput;
};


export type MutationUpdateWorkoutArgs = {
  id: Scalars['ID'];
  input: WorkoutInput;
};

export type Preference = {
  __typename?: 'Preference';
  autoAdjustWorkoutMuscleGroups?: Maybe<Scalars['Boolean']>;
  autoStartTimer?: Maybe<Scalars['Boolean']>;
  defaultRepetitions?: Maybe<Scalars['Int']>;
  distanceUnit?: Maybe<LogUnit>;
  hideUnitSelector?: Maybe<Scalars['Boolean']>;
  playTimerCompletionSound?: Maybe<Scalars['Boolean']>;
  timerDuration?: Maybe<Scalars['Int']>;
  weightUnit?: Maybe<LogUnit>;
};

export type PreferenceInput = {
  autoAdjustWorkoutMuscleGroups?: InputMaybe<Scalars['Boolean']>;
  autoStartTimer?: InputMaybe<Scalars['Boolean']>;
  defaultRepetitions?: InputMaybe<Scalars['Int']>;
  distanceUnit?: InputMaybe<LogUnit>;
  hideUnitSelector?: InputMaybe<Scalars['Boolean']>;
  playTimerCompletionSound?: InputMaybe<Scalars['Boolean']>;
  timerDuration?: InputMaybe<Scalars['Int']>;
  weightUnit?: InputMaybe<LogUnit>;
};

export type Query = {
  __typename?: 'Query';
  /** Get all logs by excerice id */
  allLogsByExerciseId: Array<ExerciseLog>;
  /** Get chart data per muscle group */
  chartDataMuscleGroups: Array<MuscleGroupChartData>;
  /** Get chart data of last x months for logs by exercise id */
  chartDataOfXMonthsByExerciseId: Array<ExerciseLineChartData>;
  checkAppVersion: Scalars['Boolean'];
  /** Count my workouts */
  countMyWorkouts: Scalars['Int'];
  /** Get total time of all workouts */
  countTotalTimeAllMyWorkoutsInMinutes: Scalars['Float'];
  /** Get all of the latest logs by exercise id from the same workout */
  latestLogsByExerciseId?: Maybe<Array<Maybe<ExerciseLog>>>;
  /** Get all of the latest logs by exercise id from the same workout except given workout Id */
  latestLogsByExerciseIdAndNotWorkoutId?: Maybe<Array<Maybe<ExerciseLog>>>;
  me?: Maybe<User>;
  /** Check if me has an active workout ie. one that hasn't ended yet */
  meHasActiveWorkout: Scalars['Boolean'];
  myExercises?: Maybe<Array<Exercise>>;
  myPreference?: Maybe<Preference>;
  /** Fetch all my current workouts */
  myWorkouts?: Maybe<Array<Workout>>;
  onboardingExercises: Array<Exercise>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  /** Fetch workout by ID */
  workoutById?: Maybe<Workout>;
  /** Fetch all workouts of user by current month with given timestamp */
  workoutsOfCurrentMonth: Array<Workout>;
};


export type QueryAllLogsByExerciseIdArgs = {
  exerciseId: Scalars['ID'];
};


export type QueryChartDataOfXMonthsByExerciseIdArgs = {
  exerciseId: Scalars['ID'];
  months: Scalars['Int'];
  zonedDateTimeString: Scalars['String'];
};


export type QueryLatestLogsByExerciseIdArgs = {
  exerciseId: Scalars['ID'];
};


export type QueryLatestLogsByExerciseIdAndNotWorkoutIdArgs = {
  exerciseId: Scalars['ID'];
  workoutId: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutsOfCurrentMonthArgs = {
  zonedDateTimeString: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  cognitoUser: CognitoUser;
  fid: Scalars['String'];
  id: Scalars['ID'];
  onboardingCompleted?: Maybe<Scalars['Boolean']>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  password: Scalars['String'];
};

export type Workout = {
  __typename?: 'Workout';
  active?: Maybe<Scalars['Boolean']>;
  endDateTime?: Maybe<Scalars['LocalDateTime']>;
  exerciseLogs: Array<ExerciseLog>;
  externalHealthProviderData?: Maybe<ExternalHealthProviderData>;
  groupedExerciseLogs: Array<GroupedExerciseLog>;
  id: Scalars['ID'];
  muscleGroups: Array<MuscleGroup>;
  name: Scalars['String'];
  remark?: Maybe<Scalars['String']>;
  startDateTime?: Maybe<Scalars['LocalDateTime']>;
};

export type WorkoutInput = {
  muscleGroups: Array<MuscleGroup>;
  name: Scalars['String'];
  remark?: InputMaybe<Scalars['String']>;
  zonedDateTime: Scalars['String'];
};
