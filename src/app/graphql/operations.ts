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

export type BiometricsLog = {
  __typename?: 'BiometricsLog';
  dataSource?: Maybe<ExternalHealthProvider>;
  id: Scalars['ID'];
  logDate: Scalars['LocalDateTime'];
  type: BiometricsType;
  value: Scalars['Float'];
};

export type BiometricsLogInput = {
  dataSource?: InputMaybe<ExternalHealthProvider>;
  logDate: Scalars['String'];
  type: BiometricsType;
  unit: LogUnit;
  value: Scalars['Float'];
};

export enum BiometricsType {
  WEIGHT = 'WEIGHT'
}

export type CognitoUser = {
  __typename?: 'CognitoUser';
  createdDate?: Maybe<Scalars['String']>;
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
  APPLE_HEALTH = 'APPLE_HEALTH'
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
  KG = 'KG',
  KM = 'KM',
  LBS = 'LBS',
  MI = 'MI',
  MIN = 'MIN',
  SEC = 'SEC'
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

export type MuscleGroupChartData = {
  __typename?: 'MuscleGroupChartData';
  color: Scalars['String'];
  count: Scalars['Int'];
  muscleGroup: MuscleGroup;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add calories burned to workout */
  addEstimatedCaloriesBurned: Workout;
  addExerciseLog?: Maybe<Workout>;
  /** Add external health provider data to workout */
  addExternalHealthProviderData: Workout;
  addOnboardingExercises?: Maybe<Scalars['Boolean']>;
  completeOnboarding: User;
  createExercise?: Maybe<Exercise>;
  createProgram: Program;
  createProgramLog: ProgramLog;
  createProgramLogGroup: ProgramLogGroup;
  createUser?: Maybe<User>;
  deleteExercise: Scalars['Boolean'];
  deleteProgram: Scalars['Boolean'];
  deleteProgramLog: Scalars['Boolean'];
  deleteProgramLogGroup: Scalars['Boolean'];
  /** Delete workout by ID */
  deleteWorkout?: Maybe<Scalars['Boolean']>;
  /** End workout by ID */
  endWorkout?: Maybe<Workout>;
  logBiometrics: User;
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
  updateProgram: Program;
  updateProgramLog: ProgramLog;
  updateProgramLogGroup: ProgramLogGroup;
  /** Update workout by ID */
  updateWorkout: Workout;
};


export type MutationAddEstimatedCaloriesBurnedArgs = {
  estimatedCaloriesBurned: Scalars['Float'];
  workoutId: Scalars['ID'];
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


export type MutationCreateProgramArgs = {
  input?: InputMaybe<ProgramInput>;
};


export type MutationCreateProgramLogArgs = {
  input?: InputMaybe<ProgramLogInput>;
};


export type MutationCreateProgramLogGroupArgs = {
  input?: InputMaybe<ProgramLogGroupInput>;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProgramArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProgramLogArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProgramLogGroupArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutArgs = {
  id: Scalars['ID'];
};


export type MutationEndWorkoutArgs = {
  workoutId: Scalars['ID'];
  zonedDateTimeString: Scalars['String'];
};


export type MutationLogBiometricsArgs = {
  biometricsLogInput: BiometricsLogInput;
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


export type MutationUpdateProgramArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<ProgramInput>;
};


export type MutationUpdateProgramLogArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<ProgramLogInput>;
};


export type MutationUpdateProgramLogGroupArgs = {
  id: Scalars['ID'];
  type?: InputMaybe<ProgramLogGroupType>;
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

export type Program = {
  __typename?: 'Program';
  active: Scalars['Boolean'];
  /** The date and time when the program was created. */
  createdDateTime: Scalars['LocalDateTime'];
  /** The date and time when the program ends. */
  endDateTime?: Maybe<Scalars['LocalDateTime']>;
  /** The estimated calories burned by the program. */
  estimatedCaloriesBurned?: Maybe<Scalars['Int']>;
  /** The external health provider data. (e.g. Apple Health) */
  externalHealthProviderData?: Maybe<ExternalHealthProviderData>;
  id: Scalars['ID'];
  /** The groups of the program. */
  logGroups: Array<ProgramLogGroup>;
  name: Scalars['String'];
  remark?: Maybe<Scalars['String']>;
  /** The date and time when the program starts. */
  startDateTime?: Maybe<Scalars['LocalDateTime']>;
};

export type ProgramInput = {
  name: Scalars['String'];
  remark?: InputMaybe<Scalars['String']>;
  startDateTime?: InputMaybe<Scalars['String']>;
  zonedDateTime: Scalars['String'];
};

export type ProgramLog = {
  __typename?: 'ProgramLog';
  /** Cooldown in seconds. */
  cooldownSeconds?: Maybe<Scalars['Int']>;
  /** Effort on scale of 1 to 100 */
  effort?: Maybe<Scalars['Int']>;
  exercise?: Maybe<Exercise>;
  id?: Maybe<Scalars['ID']>;
  /** Interval in seconds. */
  intervalSeconds?: Maybe<Scalars['Int']>;
  logValue: LogValue;
  /** The program attached */
  program?: Maybe<Program>;
  /** The program log group of the program log. */
  programLogGroup?: Maybe<ProgramLogGroup>;
  repetitions: Scalars['Int'];
  /** The subdivision of the program log. */
  subdivisions?: Maybe<Array<ProgramLog>>;
};

export type ProgramLogGroup = {
  __typename?: 'ProgramLogGroup';
  id: Scalars['ID'];
  logs: Array<ProgramLog>;
  program: Program;
  type: ProgramLogGroupType;
};

export type ProgramLogGroupInput = {
  logs: Array<ProgramLogInput>;
  programId: Scalars['ID'];
  type: ProgramLogGroupType;
};

export enum ProgramLogGroupType {
  COOLDOWN = 'COOLDOWN',
  MAIN = 'MAIN',
  WARMUP = 'WARMUP'
}

export type ProgramLogInput = {
  cooldownSeconds?: InputMaybe<Scalars['Int']>;
  effort?: InputMaybe<Scalars['Int']>;
  exerciseId?: InputMaybe<Scalars['ID']>;
  intervalSeconds?: InputMaybe<Scalars['Int']>;
  logValue: LogValueInput;
  programLogGroupId: Scalars['ID'];
  repetitions: Scalars['Int'];
  subdivisions?: InputMaybe<Array<ProgramLogInput>>;
};

export type Query = {
  __typename?: 'Query';
  /** Get all logs by excerice id */
  allLogsByExerciseId: Array<ExerciseLog>;
  /** Get chart data per muscle group for all workouts of user by current month with given timestamp */
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
  myPrograms?: Maybe<Array<Program>>;
  /** Fetch all my current workouts */
  myWorkouts?: Maybe<Array<Workout>>;
  onboardingExercises: Array<Exercise>;
  programById?: Maybe<Program>;
  programLogGroupsByProgramId?: Maybe<Array<ProgramLogGroup>>;
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


export type QueryChartDataMuscleGroupsArgs = {
  zonedDateTimeString?: InputMaybe<Scalars['String']>;
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


export type QueryProgramByIdArgs = {
  id: Scalars['ID'];
};


export type QueryProgramLogGroupsByProgramIdArgs = {
  programId: Scalars['ID'];
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
  weight?: Maybe<BiometricsLog>;
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
  estimatedCaloriesBurned?: Maybe<Scalars['Float']>;
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

export type BiometricsLogFragment = { __typename?: 'BiometricsLog', logDate: any, value: number, type: BiometricsType };

export type CognitoUserFragment = { __typename?: 'CognitoUser', given_name: string, middle_name?: string | null, family_name: string, createdDate?: string | null, name: string, gender?: string | null, email: string };

export type ExerciseFragment = { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null };

export type ExerciseLogFragment = { __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } };

export type ExerciseLineChartDataFragment = { __typename?: 'ExerciseLineChartData', monthLabel: string, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> };

export type GroupedExerciseLogFragment = { __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> };

export type LogValueFragment = { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null };

export type PreferenceFragment = { __typename?: 'Preference', weightUnit?: LogUnit | null, distanceUnit?: LogUnit | null, defaultRepetitions?: number | null, hideUnitSelector?: boolean | null, autoAdjustWorkoutMuscleGroups?: boolean | null, timerDuration?: number | null, autoStartTimer?: boolean | null, playTimerCompletionSound?: boolean | null };

export type ProgramShortFragment = { __typename?: 'Program', id: string, name: string, startDateTime?: any | null, createdDateTime: any, active: boolean, endDateTime?: any | null, remark?: string | null };

export type ProgramLongFragment = { __typename?: 'Program', id: string, name: string, startDateTime?: any | null, createdDateTime: any, active: boolean, endDateTime?: any | null, remark?: string | null, logGroups: Array<{ __typename?: 'ProgramLogGroup', id: string, type: ProgramLogGroupType, logs: Array<{ __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null }> }> };

export type ProgramLogFragment = { __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null };

export type ProgramLogGroupFragment = { __typename?: 'ProgramLogGroup', id: string, type: ProgramLogGroupType, logs: Array<{ __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null }> };

export type UserFragment = { __typename?: 'User', id: string, fid: string, onboardingCompleted?: boolean | null, cognitoUser: { __typename?: 'CognitoUser', given_name: string, middle_name?: string | null, family_name: string, createdDate?: string | null, name: string, gender?: string | null, email: string }, weight?: { __typename?: 'BiometricsLog', logDate: any, value: number, type: BiometricsType } | null };

export type WorkoutShortFragment = { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null };

export type WorkoutLongFragment = { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> }>, externalHealthProviderData?: { __typename?: 'ExternalHealthProviderData', appleHealthId: string, provider: ExternalHealthProvider } | null };

export type MuscleGroupChartDataFragment = { __typename?: 'MuscleGroupChartData', color: string, muscleGroup: MuscleGroup, count: number };

export type AddOnboardingExercisesMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddOnboardingExercisesMutation = { __typename?: 'Mutation', addOnboardingExercises?: boolean | null };

export type CreateExerciseMutationVariables = Exact<{
  input?: InputMaybe<ExerciseInput>;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise: boolean };

export type UpdateExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ExerciseInput;
}>;


export type UpdateExerciseMutation = { __typename?: 'Mutation', updateExercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null };

export type AddExerciseLogMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  input: ExerciseLogInput;
  autoAdjust: Scalars['Boolean'];
}>;


export type AddExerciseLogMutation = { __typename?: 'Mutation', addExerciseLog?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> }>, externalHealthProviderData?: { __typename?: 'ExternalHealthProviderData', appleHealthId: string, provider: ExternalHealthProvider } | null } | null };

export type ReLogLatestLogMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  zonedDateTimeString: Scalars['String'];
  autoAdjust: Scalars['Boolean'];
}>;


export type ReLogLatestLogMutation = { __typename?: 'Mutation', reLogLatestLog?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> }>, externalHealthProviderData?: { __typename?: 'ExternalHealthProviderData', appleHealthId: string, provider: ExternalHealthProvider } | null } | null };

export type ReLogLogMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  input: ExerciseLogInput;
}>;


export type ReLogLogMutation = { __typename?: 'Mutation', reLogLog?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> }>, externalHealthProviderData?: { __typename?: 'ExternalHealthProviderData', appleHealthId: string, provider: ExternalHealthProvider } | null } | null };

export type RemoveExerciseLogMutationVariables = Exact<{
  exerciseLogId: Scalars['String'];
  autoAdjust: Scalars['Boolean'];
}>;


export type RemoveExerciseLogMutation = { __typename?: 'Mutation', removeExerciseLog: boolean };

export type UpdateExerciseLogMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ExerciseLogInput;
}>;


export type UpdateExerciseLogMutation = { __typename?: 'Mutation', updateExerciseLog?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> }>, externalHealthProviderData?: { __typename?: 'ExternalHealthProviderData', appleHealthId: string, provider: ExternalHealthProvider } | null } | null };

export type UpdatePreferenceMutationVariables = Exact<{
  input: PreferenceInput;
}>;


export type UpdatePreferenceMutation = { __typename?: 'Mutation', updateMyPreference: { __typename?: 'Preference', weightUnit?: LogUnit | null, distanceUnit?: LogUnit | null, defaultRepetitions?: number | null, hideUnitSelector?: boolean | null, autoAdjustWorkoutMuscleGroups?: boolean | null, timerDuration?: number | null, autoStartTimer?: boolean | null, playTimerCompletionSound?: boolean | null } };

export type CreateProgramMutationVariables = Exact<{
  input: ProgramInput;
}>;


export type CreateProgramMutation = { __typename?: 'Mutation', createProgram: { __typename?: 'Program', id: string, name: string, startDateTime?: any | null, createdDateTime: any, active: boolean, endDateTime?: any | null, remark?: string | null } };

export type DeleteProgramMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProgramMutation = { __typename?: 'Mutation', deleteProgram: boolean };

export type CreateProgramLogMutationVariables = Exact<{
  input: ProgramLogInput;
}>;


export type CreateProgramLogMutation = { __typename?: 'Mutation', createProgramLog: { __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null } };

export type UpdateProgramLogMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ProgramLogInput;
}>;


export type UpdateProgramLogMutation = { __typename?: 'Mutation', updateProgramLog: { __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null } };

export type DeleteProgramLogMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProgramLogMutation = { __typename?: 'Mutation', deleteProgramLog: boolean };

export type CreateProgramLogGroupMutationVariables = Exact<{
  input: ProgramLogGroupInput;
}>;


export type CreateProgramLogGroupMutation = { __typename?: 'Mutation', createProgramLogGroup: { __typename?: 'ProgramLogGroup', id: string, type: ProgramLogGroupType, logs: Array<{ __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null }> } };

export type UpdateProgramLogGroupMutationVariables = Exact<{
  id: Scalars['ID'];
  type: ProgramLogGroupType;
}>;


export type UpdateProgramLogGroupMutation = { __typename?: 'Mutation', updateProgramLogGroup: { __typename?: 'ProgramLogGroup', id: string, type: ProgramLogGroupType, logs: Array<{ __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null }> } };

export type DeleteProgramLogGroupMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProgramLogGroupMutation = { __typename?: 'Mutation', deleteProgramLogGroup: boolean };

export type UpdateProgramMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ProgramInput;
}>;


export type UpdateProgramMutation = { __typename?: 'Mutation', updateProgram: { __typename?: 'Program', id: string, name: string, startDateTime?: any | null, createdDateTime: any, active: boolean, endDateTime?: any | null, remark?: string | null } };

export type CompleteOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOnboardingMutation = { __typename?: 'Mutation', completeOnboarding: { __typename?: 'User', id: string, fid: string, onboardingCompleted?: boolean | null, cognitoUser: { __typename?: 'CognitoUser', given_name: string, middle_name?: string | null, family_name: string, createdDate?: string | null, name: string, gender?: string | null, email: string }, weight?: { __typename?: 'BiometricsLog', logDate: any, value: number, type: BiometricsType } | null } };

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string } | null };

export type LogBiometricMutationVariables = Exact<{
  input: BiometricsLogInput;
}>;


export type LogBiometricMutation = { __typename?: 'Mutation', logBiometrics: { __typename?: 'User', id: string, fid: string, onboardingCompleted?: boolean | null, cognitoUser: { __typename?: 'CognitoUser', given_name: string, middle_name?: string | null, family_name: string, createdDate?: string | null, name: string, gender?: string | null, email: string }, weight?: { __typename?: 'BiometricsLog', logDate: any, value: number, type: BiometricsType } | null } };

export type AddEstimatedCaloriesBurnedMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  estimatedCaloriesBurned: Scalars['Float'];
}>;


export type AddEstimatedCaloriesBurnedMutation = { __typename?: 'Mutation', addEstimatedCaloriesBurned: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null } };

export type AddExternalHealthProviderDataMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  externalHealthProviderData: ExternalHealthProviderDataInput;
}>;


export type AddExternalHealthProviderDataMutation = { __typename?: 'Mutation', addExternalHealthProviderData: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null } };

export type DeleteWorkoutMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkoutMutation = { __typename?: 'Mutation', deleteWorkout?: boolean | null };

export type EndWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID'];
  zonedDateTimeString: Scalars['String'];
}>;


export type EndWorkoutMutation = { __typename?: 'Mutation', endWorkout?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null } | null };

export type RestartWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID'];
}>;


export type RestartWorkoutMutation = { __typename?: 'Mutation', restartWorkout: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null } };

export type StartWorkoutMutationVariables = Exact<{
  input: WorkoutInput;
}>;


export type StartWorkoutMutation = { __typename?: 'Mutation', meStartWorkout?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null } | null };

export type UpdateWorkoutMutationVariables = Exact<{
  id: Scalars['ID'];
  input: WorkoutInput;
}>;


export type UpdateWorkoutMutation = { __typename?: 'Mutation', updateWorkout: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null } };

export type CheckAppVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckAppVersionQuery = { __typename?: 'Query', checkAppVersion: boolean };

export type MyExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyExercisesQuery = { __typename?: 'Query', myExercises?: Array<{ __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }> | null };

export type OnboardingExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type OnboardingExercisesQuery = { __typename?: 'Query', onboardingExercises: Array<{ __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }> };

export type LatestLogsByExerciseIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LatestLogsByExerciseIdQuery = { __typename?: 'Query', latestLogsByExerciseId?: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } } | null> | null };

export type LatestLogsByExerciseIdAndNotWorkoutIdQueryVariables = Exact<{
  id: Scalars['ID'];
  workoutId: Scalars['String'];
}>;


export type LatestLogsByExerciseIdAndNotWorkoutIdQuery = { __typename?: 'Query', latestLogsByExerciseIdAndNotWorkoutId?: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } } | null> | null };

export type AllLogsByExerciseIdQueryVariables = Exact<{
  exerciseId: Scalars['ID'];
}>;


export type AllLogsByExerciseIdQuery = { __typename?: 'Query', allLogsByExerciseId: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> };

export type ChartDataOfXMonthsByExerciseIdQueryVariables = Exact<{
  exerciseId: Scalars['ID'];
  months: Scalars['Int'];
  zonedDateTimeString: Scalars['String'];
}>;


export type ChartDataOfXMonthsByExerciseIdQuery = { __typename?: 'Query', chartDataOfXMonthsByExerciseId: Array<{ __typename?: 'ExerciseLineChartData', monthLabel: string, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> }> };

export type MyPreferenceQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPreferenceQuery = { __typename?: 'Query', myPreference?: { __typename?: 'Preference', weightUnit?: LogUnit | null, distanceUnit?: LogUnit | null, defaultRepetitions?: number | null, hideUnitSelector?: boolean | null, autoAdjustWorkoutMuscleGroups?: boolean | null, timerDuration?: number | null, autoStartTimer?: boolean | null, playTimerCompletionSound?: boolean | null } | null };

export type MyProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProgramsQuery = { __typename?: 'Query', myPrograms?: Array<{ __typename?: 'Program', id: string, name: string, startDateTime?: any | null, createdDateTime: any, active: boolean, endDateTime?: any | null, remark?: string | null }> | null };

export type ProgramByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProgramByIdQuery = { __typename?: 'Query', programById?: { __typename?: 'Program', id: string, name: string, startDateTime?: any | null, createdDateTime: any, active: boolean, endDateTime?: any | null, remark?: string | null, logGroups: Array<{ __typename?: 'ProgramLogGroup', id: string, type: ProgramLogGroupType, logs: Array<{ __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null }> }> } | null };

export type ProgramLogGroupsByProgramIdQueryVariables = Exact<{
  programId: Scalars['ID'];
}>;


export type ProgramLogGroupsByProgramIdQuery = { __typename?: 'Query', programLogGroupsByProgramId?: Array<{ __typename?: 'ProgramLogGroup', id: string, type: ProgramLogGroupType, logs: Array<{ __typename?: 'ProgramLog', id?: string | null, effort?: number | null, repetitions: number, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, subdivisions?: Array<{ __typename?: 'ProgramLog', repetitions: number, effort?: number | null, intervalSeconds?: number | null, cooldownSeconds?: number | null, programLogGroup?: { __typename?: 'ProgramLogGroup', id: string } | null, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, exercise?: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null } | null }> | null }> }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, fid: string, onboardingCompleted?: boolean | null, cognitoUser: { __typename?: 'CognitoUser', given_name: string, middle_name?: string | null, family_name: string, createdDate?: string | null, name: string, gender?: string | null, email: string }, weight?: { __typename?: 'BiometricsLog', logDate: any, value: number, type: BiometricsType } | null } | null };

export type ChartDataMuscleGroupsQueryVariables = Exact<{
  zonedDateTime: Scalars['String'];
}>;


export type ChartDataMuscleGroupsQuery = { __typename?: 'Query', chartDataMuscleGroups: Array<{ __typename?: 'MuscleGroupChartData', color: string, muscleGroup: MuscleGroup, count: number }> };

export type CountTotalTimeWorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountTotalTimeWorkoutsQuery = { __typename?: 'Query', countTotalTimeAllMyWorkoutsInMinutes: number };

export type CountWorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountWorkoutsQuery = { __typename?: 'Query', countMyWorkouts: number };

export type HasActiveWorkoutQueryVariables = Exact<{ [key: string]: never; }>;


export type HasActiveWorkoutQuery = { __typename?: 'Query', meHasActiveWorkout: boolean };

export type WorkoutByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkoutByIdQuery = { __typename?: 'Query', workoutById?: { __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, groupedExerciseLogs: Array<{ __typename?: 'GroupedExerciseLog', exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logs: Array<{ __typename?: 'ExerciseLog', id: string, logDateTime: any, repetitions: number, warmup?: boolean | null, remark?: string | null, exercise: { __typename?: 'Exercise', id: string, name: string, primaryMuscles?: Array<MuscleGroup | null> | null, secondaryMuscles?: Array<MuscleGroup | null> | null, notes?: string | null, defaultAppliedWeight?: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null } | null }, logValue: { __typename?: 'LogValue', unit: LogUnit, base: number, fraction?: number | null }, workout: { __typename?: 'Workout', id: string } }> }>, externalHealthProviderData?: { __typename?: 'ExternalHealthProviderData', appleHealthId: string, provider: ExternalHealthProvider } | null } | null };

export type WorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutsQuery = { __typename?: 'Query', myWorkouts?: Array<{ __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null }> | null };

export type WorkoutsOfMonthQueryVariables = Exact<{
  zonedDateTime: Scalars['String'];
}>;


export type WorkoutsOfMonthQuery = { __typename?: 'Query', workoutsOfCurrentMonth: Array<{ __typename?: 'Workout', id: string, name: string, muscleGroups: Array<MuscleGroup>, startDateTime?: any | null, endDateTime?: any | null, active?: boolean | null, remark?: string | null, estimatedCaloriesBurned?: number | null }> };

export const LogValueFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
export const ExerciseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
export const ExerciseLogFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
export const ExerciseLineChartDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLineChartData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLineChartData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthLabel"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
export const PreferenceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Preference"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Preference"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weightUnit"}},{"kind":"Field","name":{"kind":"Name","value":"distanceUnit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultRepetitions"}},{"kind":"Field","name":{"kind":"Name","value":"hideUnitSelector"}},{"kind":"Field","name":{"kind":"Name","value":"autoAdjustWorkoutMuscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"timerDuration"}},{"kind":"Field","name":{"kind":"Name","value":"autoStartTimer"}},{"kind":"Field","name":{"kind":"Name","value":"playTimerCompletionSound"}}]}}]} as unknown as DocumentNode;
export const ProgramShortFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}}]} as unknown as DocumentNode;
export const ProgramLogFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
export const ProgramLogGroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLogGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}}]} as unknown as DocumentNode;
export const ProgramLongFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"logGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLogGroup"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLogGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLog"}}]}}]}}]} as unknown as DocumentNode;
export const CognitoUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CognitoUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CognitoUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode;
export const BiometricsLogFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BiometricsLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BiometricsLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logDate"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"cognitoUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CognitoUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BiometricsLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BiometricsLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BiometricsLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logDate"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CognitoUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CognitoUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode;
export const WorkoutShortFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;
export const GroupedExerciseLogFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
export const WorkoutLongFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"externalHealthProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appleHealthId"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
export const MuscleGroupChartDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuscleGroupChartData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuscleGroupChartData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroup"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]} as unknown as DocumentNode;
export const AddOnboardingExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addOnboardingExercises"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOnboardingExercises"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode;
export type AddOnboardingExercisesMutationFn = Apollo.MutationFunction<AddOnboardingExercisesMutation, AddOnboardingExercisesMutationVariables>;

/**
 * __useAddOnboardingExercisesMutation__
 *
 * To run a mutation, you first call `useAddOnboardingExercisesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOnboardingExercisesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOnboardingExercisesMutation, { data, loading, error }] = useAddOnboardingExercisesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useAddOnboardingExercisesMutation(baseOptions?: Apollo.MutationHookOptions<AddOnboardingExercisesMutation, AddOnboardingExercisesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOnboardingExercisesMutation, AddOnboardingExercisesMutationVariables>(AddOnboardingExercisesDocument, options);
      }
export type AddOnboardingExercisesMutationHookResult = ReturnType<typeof useAddOnboardingExercisesMutation>;
export type AddOnboardingExercisesMutationResult = Apollo.MutationResult<AddOnboardingExercisesMutation>;
export type AddOnboardingExercisesMutationOptions = Apollo.BaseMutationOptions<AddOnboardingExercisesMutation, AddOnboardingExercisesMutationVariables>;
export const CreateExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExercise"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
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
export const UpdateExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExercise"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;
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
export const AddExerciseLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addExerciseLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLogInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoAdjust"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExerciseLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"autoAdjust"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoAdjust"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutLong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"externalHealthProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appleHealthId"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]} as unknown as DocumentNode;
export type AddExerciseLogMutationFn = Apollo.MutationFunction<AddExerciseLogMutation, AddExerciseLogMutationVariables>;

/**
 * __useAddExerciseLogMutation__
 *
 * To run a mutation, you first call `useAddExerciseLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseLogMutation, { data, loading, error }] = useAddExerciseLogMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      input: // value for 'input'
 *      autoAdjust: // value for 'autoAdjust'
 *   },
 * });
 */
export function useAddExerciseLogMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseLogMutation, AddExerciseLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciseLogMutation, AddExerciseLogMutationVariables>(AddExerciseLogDocument, options);
      }
export type AddExerciseLogMutationHookResult = ReturnType<typeof useAddExerciseLogMutation>;
export type AddExerciseLogMutationResult = Apollo.MutationResult<AddExerciseLogMutation>;
export type AddExerciseLogMutationOptions = Apollo.BaseMutationOptions<AddExerciseLogMutation, AddExerciseLogMutationVariables>;
export const ReLogLatestLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"reLogLatestLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTimeString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoAdjust"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reLogLatestLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}},{"kind":"Argument","name":{"kind":"Name","value":"zonedDateTimeString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTimeString"}}},{"kind":"Argument","name":{"kind":"Name","value":"autoAdjust"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoAdjust"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutLong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"externalHealthProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appleHealthId"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]} as unknown as DocumentNode;
export type ReLogLatestLogMutationFn = Apollo.MutationFunction<ReLogLatestLogMutation, ReLogLatestLogMutationVariables>;

/**
 * __useReLogLatestLogMutation__
 *
 * To run a mutation, you first call `useReLogLatestLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReLogLatestLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reLogLatestLogMutation, { data, loading, error }] = useReLogLatestLogMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      zonedDateTimeString: // value for 'zonedDateTimeString'
 *      autoAdjust: // value for 'autoAdjust'
 *   },
 * });
 */
export function useReLogLatestLogMutation(baseOptions?: Apollo.MutationHookOptions<ReLogLatestLogMutation, ReLogLatestLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReLogLatestLogMutation, ReLogLatestLogMutationVariables>(ReLogLatestLogDocument, options);
      }
export type ReLogLatestLogMutationHookResult = ReturnType<typeof useReLogLatestLogMutation>;
export type ReLogLatestLogMutationResult = Apollo.MutationResult<ReLogLatestLogMutation>;
export type ReLogLatestLogMutationOptions = Apollo.BaseMutationOptions<ReLogLatestLogMutation, ReLogLatestLogMutationVariables>;
export const ReLogLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"reLogLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reLogLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutLong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"externalHealthProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appleHealthId"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]} as unknown as DocumentNode;
export type ReLogLogMutationFn = Apollo.MutationFunction<ReLogLogMutation, ReLogLogMutationVariables>;

/**
 * __useReLogLogMutation__
 *
 * To run a mutation, you first call `useReLogLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReLogLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reLogLogMutation, { data, loading, error }] = useReLogLogMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReLogLogMutation(baseOptions?: Apollo.MutationHookOptions<ReLogLogMutation, ReLogLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReLogLogMutation, ReLogLogMutationVariables>(ReLogLogDocument, options);
      }
export type ReLogLogMutationHookResult = ReturnType<typeof useReLogLogMutation>;
export type ReLogLogMutationResult = Apollo.MutationResult<ReLogLogMutation>;
export type ReLogLogMutationOptions = Apollo.BaseMutationOptions<ReLogLogMutation, ReLogLogMutationVariables>;
export const RemoveExerciseLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeExerciseLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseLogId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoAdjust"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeExerciseLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseLogId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseLogId"}}},{"kind":"Argument","name":{"kind":"Name","value":"autoAdjust"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoAdjust"}}}]}]}}]} as unknown as DocumentNode;
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
 *      autoAdjust: // value for 'autoAdjust'
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
export const UpdateExerciseLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateExerciseLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExerciseLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseLogId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutLong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"externalHealthProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appleHealthId"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]} as unknown as DocumentNode;
export type UpdateExerciseLogMutationFn = Apollo.MutationFunction<UpdateExerciseLogMutation, UpdateExerciseLogMutationVariables>;

/**
 * __useUpdateExerciseLogMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseLogMutation, { data, loading, error }] = useUpdateExerciseLogMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExerciseLogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseLogMutation, UpdateExerciseLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseLogMutation, UpdateExerciseLogMutationVariables>(UpdateExerciseLogDocument, options);
      }
export type UpdateExerciseLogMutationHookResult = ReturnType<typeof useUpdateExerciseLogMutation>;
export type UpdateExerciseLogMutationResult = Apollo.MutationResult<UpdateExerciseLogMutation>;
export type UpdateExerciseLogMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseLogMutation, UpdateExerciseLogMutationVariables>;
export const UpdatePreferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePreference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreferenceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMyPreference"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Preference"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Preference"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Preference"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weightUnit"}},{"kind":"Field","name":{"kind":"Name","value":"distanceUnit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultRepetitions"}},{"kind":"Field","name":{"kind":"Name","value":"hideUnitSelector"}},{"kind":"Field","name":{"kind":"Name","value":"autoAdjustWorkoutMuscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"timerDuration"}},{"kind":"Field","name":{"kind":"Name","value":"autoStartTimer"}},{"kind":"Field","name":{"kind":"Name","value":"playTimerCompletionSound"}}]}}]} as unknown as DocumentNode;
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
export const CreateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}}]} as unknown as DocumentNode;
export type CreateProgramMutationFn = Apollo.MutationFunction<CreateProgramMutation, CreateProgramMutationVariables>;

/**
 * __useCreateProgramMutation__
 *
 * To run a mutation, you first call `useCreateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProgramMutation, { data, loading, error }] = useCreateProgramMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProgramMutation(baseOptions?: Apollo.MutationHookOptions<CreateProgramMutation, CreateProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProgramMutation, CreateProgramMutationVariables>(CreateProgramDocument, options);
      }
export type CreateProgramMutationHookResult = ReturnType<typeof useCreateProgramMutation>;
export type CreateProgramMutationResult = Apollo.MutationResult<CreateProgramMutation>;
export type CreateProgramMutationOptions = Apollo.BaseMutationOptions<CreateProgramMutation, CreateProgramMutationVariables>;
export const DeleteProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteProgramMutationFn = Apollo.MutationFunction<DeleteProgramMutation, DeleteProgramMutationVariables>;

/**
 * __useDeleteProgramMutation__
 *
 * To run a mutation, you first call `useDeleteProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProgramMutation, { data, loading, error }] = useDeleteProgramMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProgramMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProgramMutation, DeleteProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProgramMutation, DeleteProgramMutationVariables>(DeleteProgramDocument, options);
      }
export type DeleteProgramMutationHookResult = ReturnType<typeof useDeleteProgramMutation>;
export type DeleteProgramMutationResult = Apollo.MutationResult<DeleteProgramMutation>;
export type DeleteProgramMutationOptions = Apollo.BaseMutationOptions<DeleteProgramMutation, DeleteProgramMutationVariables>;
export const CreateProgramLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProgramLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgramLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}}]} as unknown as DocumentNode;
export type CreateProgramLogMutationFn = Apollo.MutationFunction<CreateProgramLogMutation, CreateProgramLogMutationVariables>;

/**
 * __useCreateProgramLogMutation__
 *
 * To run a mutation, you first call `useCreateProgramLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProgramLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProgramLogMutation, { data, loading, error }] = useCreateProgramLogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProgramLogMutation(baseOptions?: Apollo.MutationHookOptions<CreateProgramLogMutation, CreateProgramLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProgramLogMutation, CreateProgramLogMutationVariables>(CreateProgramLogDocument, options);
      }
export type CreateProgramLogMutationHookResult = ReturnType<typeof useCreateProgramLogMutation>;
export type CreateProgramLogMutationResult = Apollo.MutationResult<CreateProgramLogMutation>;
export type CreateProgramLogMutationOptions = Apollo.BaseMutationOptions<CreateProgramLogMutation, CreateProgramLogMutationVariables>;
export const UpdateProgramLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProgramLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProgramLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}}]} as unknown as DocumentNode;
export type UpdateProgramLogMutationFn = Apollo.MutationFunction<UpdateProgramLogMutation, UpdateProgramLogMutationVariables>;

/**
 * __useUpdateProgramLogMutation__
 *
 * To run a mutation, you first call `useUpdateProgramLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProgramLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProgramLogMutation, { data, loading, error }] = useUpdateProgramLogMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProgramLogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProgramLogMutation, UpdateProgramLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProgramLogMutation, UpdateProgramLogMutationVariables>(UpdateProgramLogDocument, options);
      }
export type UpdateProgramLogMutationHookResult = ReturnType<typeof useUpdateProgramLogMutation>;
export type UpdateProgramLogMutationResult = Apollo.MutationResult<UpdateProgramLogMutation>;
export type UpdateProgramLogMutationOptions = Apollo.BaseMutationOptions<UpdateProgramLogMutation, UpdateProgramLogMutationVariables>;
export const DeleteProgramLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProgramLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProgramLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteProgramLogMutationFn = Apollo.MutationFunction<DeleteProgramLogMutation, DeleteProgramLogMutationVariables>;

/**
 * __useDeleteProgramLogMutation__
 *
 * To run a mutation, you first call `useDeleteProgramLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProgramLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProgramLogMutation, { data, loading, error }] = useDeleteProgramLogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProgramLogMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProgramLogMutation, DeleteProgramLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProgramLogMutation, DeleteProgramLogMutationVariables>(DeleteProgramLogDocument, options);
      }
export type DeleteProgramLogMutationHookResult = ReturnType<typeof useDeleteProgramLogMutation>;
export type DeleteProgramLogMutationResult = Apollo.MutationResult<DeleteProgramLogMutation>;
export type DeleteProgramLogMutationOptions = Apollo.BaseMutationOptions<DeleteProgramLogMutation, DeleteProgramLogMutationVariables>;
export const CreateProgramLogGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProgramLogGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgramLogGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLogGroup"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLogGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLog"}}]}}]}}]} as unknown as DocumentNode;
export type CreateProgramLogGroupMutationFn = Apollo.MutationFunction<CreateProgramLogGroupMutation, CreateProgramLogGroupMutationVariables>;

/**
 * __useCreateProgramLogGroupMutation__
 *
 * To run a mutation, you first call `useCreateProgramLogGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProgramLogGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProgramLogGroupMutation, { data, loading, error }] = useCreateProgramLogGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProgramLogGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateProgramLogGroupMutation, CreateProgramLogGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProgramLogGroupMutation, CreateProgramLogGroupMutationVariables>(CreateProgramLogGroupDocument, options);
      }
export type CreateProgramLogGroupMutationHookResult = ReturnType<typeof useCreateProgramLogGroupMutation>;
export type CreateProgramLogGroupMutationResult = Apollo.MutationResult<CreateProgramLogGroupMutation>;
export type CreateProgramLogGroupMutationOptions = Apollo.BaseMutationOptions<CreateProgramLogGroupMutation, CreateProgramLogGroupMutationVariables>;
export const UpdateProgramLogGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProgramLogGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogGroupType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProgramLogGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLogGroup"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLogGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLog"}}]}}]}}]} as unknown as DocumentNode;
export type UpdateProgramLogGroupMutationFn = Apollo.MutationFunction<UpdateProgramLogGroupMutation, UpdateProgramLogGroupMutationVariables>;

/**
 * __useUpdateProgramLogGroupMutation__
 *
 * To run a mutation, you first call `useUpdateProgramLogGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProgramLogGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProgramLogGroupMutation, { data, loading, error }] = useUpdateProgramLogGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUpdateProgramLogGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProgramLogGroupMutation, UpdateProgramLogGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProgramLogGroupMutation, UpdateProgramLogGroupMutationVariables>(UpdateProgramLogGroupDocument, options);
      }
export type UpdateProgramLogGroupMutationHookResult = ReturnType<typeof useUpdateProgramLogGroupMutation>;
export type UpdateProgramLogGroupMutationResult = Apollo.MutationResult<UpdateProgramLogGroupMutation>;
export type UpdateProgramLogGroupMutationOptions = Apollo.BaseMutationOptions<UpdateProgramLogGroupMutation, UpdateProgramLogGroupMutationVariables>;
export const DeleteProgramLogGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProgramLogGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProgramLogGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteProgramLogGroupMutationFn = Apollo.MutationFunction<DeleteProgramLogGroupMutation, DeleteProgramLogGroupMutationVariables>;

/**
 * __useDeleteProgramLogGroupMutation__
 *
 * To run a mutation, you first call `useDeleteProgramLogGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProgramLogGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProgramLogGroupMutation, { data, loading, error }] = useDeleteProgramLogGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProgramLogGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProgramLogGroupMutation, DeleteProgramLogGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProgramLogGroupMutation, DeleteProgramLogGroupMutationVariables>(DeleteProgramLogGroupDocument, options);
      }
export type DeleteProgramLogGroupMutationHookResult = ReturnType<typeof useDeleteProgramLogGroupMutation>;
export type DeleteProgramLogGroupMutationResult = Apollo.MutationResult<DeleteProgramLogGroupMutation>;
export type DeleteProgramLogGroupMutationOptions = Apollo.BaseMutationOptions<DeleteProgramLogGroupMutation, DeleteProgramLogGroupMutationVariables>;
export const UpdateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}}]} as unknown as DocumentNode;
export type UpdateProgramMutationFn = Apollo.MutationFunction<UpdateProgramMutation, UpdateProgramMutationVariables>;

/**
 * __useUpdateProgramMutation__
 *
 * To run a mutation, you first call `useUpdateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProgramMutation, { data, loading, error }] = useUpdateProgramMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProgramMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProgramMutation, UpdateProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProgramMutation, UpdateProgramMutationVariables>(UpdateProgramDocument, options);
      }
export type UpdateProgramMutationHookResult = ReturnType<typeof useUpdateProgramMutation>;
export type UpdateProgramMutationResult = Apollo.MutationResult<UpdateProgramMutation>;
export type UpdateProgramMutationOptions = Apollo.BaseMutationOptions<UpdateProgramMutation, UpdateProgramMutationVariables>;
export const CompleteOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"completeOnboarding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeOnboarding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BiometricsLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BiometricsLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logDate"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CognitoUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CognitoUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"cognitoUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CognitoUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BiometricsLog"}}]}}]}}]} as unknown as DocumentNode;
export type CompleteOnboardingMutationFn = Apollo.MutationFunction<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>;

/**
 * __useCompleteOnboardingMutation__
 *
 * To run a mutation, you first call `useCompleteOnboardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteOnboardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeOnboardingMutation, { data, loading, error }] = useCompleteOnboardingMutation({
 *   variables: {
 *   },
 * });
 */
export function useCompleteOnboardingMutation(baseOptions?: Apollo.MutationHookOptions<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>(CompleteOnboardingDocument, options);
      }
export type CompleteOnboardingMutationHookResult = ReturnType<typeof useCompleteOnboardingMutation>;
export type CompleteOnboardingMutationResult = Apollo.MutationResult<CompleteOnboardingMutation>;
export type CompleteOnboardingMutationOptions = Apollo.BaseMutationOptions<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>;
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
export const LogBiometricDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logBiometric"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BiometricsLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logBiometrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"biometricsLogInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BiometricsLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BiometricsLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logDate"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CognitoUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CognitoUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"cognitoUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CognitoUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BiometricsLog"}}]}}]}}]} as unknown as DocumentNode;
export type LogBiometricMutationFn = Apollo.MutationFunction<LogBiometricMutation, LogBiometricMutationVariables>;

/**
 * __useLogBiometricMutation__
 *
 * To run a mutation, you first call `useLogBiometricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogBiometricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logBiometricMutation, { data, loading, error }] = useLogBiometricMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogBiometricMutation(baseOptions?: Apollo.MutationHookOptions<LogBiometricMutation, LogBiometricMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogBiometricMutation, LogBiometricMutationVariables>(LogBiometricDocument, options);
      }
export type LogBiometricMutationHookResult = ReturnType<typeof useLogBiometricMutation>;
export type LogBiometricMutationResult = Apollo.MutationResult<LogBiometricMutation>;
export type LogBiometricMutationOptions = Apollo.BaseMutationOptions<LogBiometricMutation, LogBiometricMutationVariables>;
export const AddEstimatedCaloriesBurnedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEstimatedCaloriesBurned"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"estimatedCaloriesBurned"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEstimatedCaloriesBurned"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}},{"kind":"Argument","name":{"kind":"Name","value":"estimatedCaloriesBurned"},"value":{"kind":"Variable","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;
export type AddEstimatedCaloriesBurnedMutationFn = Apollo.MutationFunction<AddEstimatedCaloriesBurnedMutation, AddEstimatedCaloriesBurnedMutationVariables>;

/**
 * __useAddEstimatedCaloriesBurnedMutation__
 *
 * To run a mutation, you first call `useAddEstimatedCaloriesBurnedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEstimatedCaloriesBurnedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEstimatedCaloriesBurnedMutation, { data, loading, error }] = useAddEstimatedCaloriesBurnedMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      estimatedCaloriesBurned: // value for 'estimatedCaloriesBurned'
 *   },
 * });
 */
export function useAddEstimatedCaloriesBurnedMutation(baseOptions?: Apollo.MutationHookOptions<AddEstimatedCaloriesBurnedMutation, AddEstimatedCaloriesBurnedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEstimatedCaloriesBurnedMutation, AddEstimatedCaloriesBurnedMutationVariables>(AddEstimatedCaloriesBurnedDocument, options);
      }
export type AddEstimatedCaloriesBurnedMutationHookResult = ReturnType<typeof useAddEstimatedCaloriesBurnedMutation>;
export type AddEstimatedCaloriesBurnedMutationResult = Apollo.MutationResult<AddEstimatedCaloriesBurnedMutation>;
export type AddEstimatedCaloriesBurnedMutationOptions = Apollo.BaseMutationOptions<AddEstimatedCaloriesBurnedMutation, AddEstimatedCaloriesBurnedMutationVariables>;
export const AddExternalHealthProviderDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addExternalHealthProviderData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"externalHealthProviderData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExternalHealthProviderDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExternalHealthProviderData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"externalHealthProviderData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;
export type AddExternalHealthProviderDataMutationFn = Apollo.MutationFunction<AddExternalHealthProviderDataMutation, AddExternalHealthProviderDataMutationVariables>;

/**
 * __useAddExternalHealthProviderDataMutation__
 *
 * To run a mutation, you first call `useAddExternalHealthProviderDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExternalHealthProviderDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExternalHealthProviderDataMutation, { data, loading, error }] = useAddExternalHealthProviderDataMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      externalHealthProviderData: // value for 'externalHealthProviderData'
 *   },
 * });
 */
export function useAddExternalHealthProviderDataMutation(baseOptions?: Apollo.MutationHookOptions<AddExternalHealthProviderDataMutation, AddExternalHealthProviderDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExternalHealthProviderDataMutation, AddExternalHealthProviderDataMutationVariables>(AddExternalHealthProviderDataDocument, options);
      }
export type AddExternalHealthProviderDataMutationHookResult = ReturnType<typeof useAddExternalHealthProviderDataMutation>;
export type AddExternalHealthProviderDataMutationResult = Apollo.MutationResult<AddExternalHealthProviderDataMutation>;
export type AddExternalHealthProviderDataMutationOptions = Apollo.BaseMutationOptions<AddExternalHealthProviderDataMutation, AddExternalHealthProviderDataMutationVariables>;
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
export const EndWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTimeString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}},{"kind":"Argument","name":{"kind":"Name","value":"zonedDateTimeString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTimeString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;
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
export const RestartWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"restartWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restartWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;
export type RestartWorkoutMutationFn = Apollo.MutationFunction<RestartWorkoutMutation, RestartWorkoutMutationVariables>;

/**
 * __useRestartWorkoutMutation__
 *
 * To run a mutation, you first call `useRestartWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestartWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restartWorkoutMutation, { data, loading, error }] = useRestartWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useRestartWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<RestartWorkoutMutation, RestartWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestartWorkoutMutation, RestartWorkoutMutationVariables>(RestartWorkoutDocument, options);
      }
export type RestartWorkoutMutationHookResult = ReturnType<typeof useRestartWorkoutMutation>;
export type RestartWorkoutMutationResult = Apollo.MutationResult<RestartWorkoutMutation>;
export type RestartWorkoutMutationOptions = Apollo.BaseMutationOptions<RestartWorkoutMutation, RestartWorkoutMutationVariables>;
export const StartWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meStartWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;
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
export const UpdateWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;
export type UpdateWorkoutMutationFn = Apollo.MutationFunction<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;

/**
 * __useUpdateWorkoutMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutMutation, { data, loading, error }] = useUpdateWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>(UpdateWorkoutDocument, options);
      }
export type UpdateWorkoutMutationHookResult = ReturnType<typeof useUpdateWorkoutMutation>;
export type UpdateWorkoutMutationResult = Apollo.MutationResult<UpdateWorkoutMutation>;
export type UpdateWorkoutMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;
export const CheckAppVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checkAppVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkAppVersion"}}]}}]} as unknown as DocumentNode;

/**
 * __useCheckAppVersionQuery__
 *
 * To run a query within a React component, call `useCheckAppVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckAppVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckAppVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckAppVersionQuery(baseOptions?: Apollo.QueryHookOptions<CheckAppVersionQuery, CheckAppVersionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckAppVersionQuery, CheckAppVersionQueryVariables>(CheckAppVersionDocument, options);
      }
export function useCheckAppVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckAppVersionQuery, CheckAppVersionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckAppVersionQuery, CheckAppVersionQueryVariables>(CheckAppVersionDocument, options);
        }
export type CheckAppVersionQueryHookResult = ReturnType<typeof useCheckAppVersionQuery>;
export type CheckAppVersionLazyQueryHookResult = ReturnType<typeof useCheckAppVersionLazyQuery>;
export type CheckAppVersionQueryResult = Apollo.QueryResult<CheckAppVersionQuery, CheckAppVersionQueryVariables>;
export const MyExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;

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
export const OnboardingExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"onboardingExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onboardingExercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;

/**
 * __useOnboardingExercisesQuery__
 *
 * To run a query within a React component, call `useOnboardingExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnboardingExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnboardingExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useOnboardingExercisesQuery(baseOptions?: Apollo.QueryHookOptions<OnboardingExercisesQuery, OnboardingExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OnboardingExercisesQuery, OnboardingExercisesQueryVariables>(OnboardingExercisesDocument, options);
      }
export function useOnboardingExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OnboardingExercisesQuery, OnboardingExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OnboardingExercisesQuery, OnboardingExercisesQueryVariables>(OnboardingExercisesDocument, options);
        }
export type OnboardingExercisesQueryHookResult = ReturnType<typeof useOnboardingExercisesQuery>;
export type OnboardingExercisesLazyQueryHookResult = ReturnType<typeof useOnboardingExercisesLazyQuery>;
export type OnboardingExercisesQueryResult = Apollo.QueryResult<OnboardingExercisesQuery, OnboardingExercisesQueryVariables>;
export const LatestLogsByExerciseIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"latestLogsByExerciseId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestLogsByExerciseId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;

/**
 * __useLatestLogsByExerciseIdQuery__
 *
 * To run a query within a React component, call `useLatestLogsByExerciseIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestLogsByExerciseIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestLogsByExerciseIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLatestLogsByExerciseIdQuery(baseOptions: Apollo.QueryHookOptions<LatestLogsByExerciseIdQuery, LatestLogsByExerciseIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestLogsByExerciseIdQuery, LatestLogsByExerciseIdQueryVariables>(LatestLogsByExerciseIdDocument, options);
      }
export function useLatestLogsByExerciseIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestLogsByExerciseIdQuery, LatestLogsByExerciseIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestLogsByExerciseIdQuery, LatestLogsByExerciseIdQueryVariables>(LatestLogsByExerciseIdDocument, options);
        }
export type LatestLogsByExerciseIdQueryHookResult = ReturnType<typeof useLatestLogsByExerciseIdQuery>;
export type LatestLogsByExerciseIdLazyQueryHookResult = ReturnType<typeof useLatestLogsByExerciseIdLazyQuery>;
export type LatestLogsByExerciseIdQueryResult = Apollo.QueryResult<LatestLogsByExerciseIdQuery, LatestLogsByExerciseIdQueryVariables>;
export const LatestLogsByExerciseIdAndNotWorkoutIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"latestLogsByExerciseIdAndNotWorkoutId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestLogsByExerciseIdAndNotWorkoutId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"workoutId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workoutId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;

/**
 * __useLatestLogsByExerciseIdAndNotWorkoutIdQuery__
 *
 * To run a query within a React component, call `useLatestLogsByExerciseIdAndNotWorkoutIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestLogsByExerciseIdAndNotWorkoutIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestLogsByExerciseIdAndNotWorkoutIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useLatestLogsByExerciseIdAndNotWorkoutIdQuery(baseOptions: Apollo.QueryHookOptions<LatestLogsByExerciseIdAndNotWorkoutIdQuery, LatestLogsByExerciseIdAndNotWorkoutIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestLogsByExerciseIdAndNotWorkoutIdQuery, LatestLogsByExerciseIdAndNotWorkoutIdQueryVariables>(LatestLogsByExerciseIdAndNotWorkoutIdDocument, options);
      }
export function useLatestLogsByExerciseIdAndNotWorkoutIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestLogsByExerciseIdAndNotWorkoutIdQuery, LatestLogsByExerciseIdAndNotWorkoutIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestLogsByExerciseIdAndNotWorkoutIdQuery, LatestLogsByExerciseIdAndNotWorkoutIdQueryVariables>(LatestLogsByExerciseIdAndNotWorkoutIdDocument, options);
        }
export type LatestLogsByExerciseIdAndNotWorkoutIdQueryHookResult = ReturnType<typeof useLatestLogsByExerciseIdAndNotWorkoutIdQuery>;
export type LatestLogsByExerciseIdAndNotWorkoutIdLazyQueryHookResult = ReturnType<typeof useLatestLogsByExerciseIdAndNotWorkoutIdLazyQuery>;
export type LatestLogsByExerciseIdAndNotWorkoutIdQueryResult = Apollo.QueryResult<LatestLogsByExerciseIdAndNotWorkoutIdQuery, LatestLogsByExerciseIdAndNotWorkoutIdQueryVariables>;
export const AllLogsByExerciseIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allLogsByExerciseId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allLogsByExerciseId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;

/**
 * __useAllLogsByExerciseIdQuery__
 *
 * To run a query within a React component, call `useAllLogsByExerciseIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLogsByExerciseIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLogsByExerciseIdQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useAllLogsByExerciseIdQuery(baseOptions: Apollo.QueryHookOptions<AllLogsByExerciseIdQuery, AllLogsByExerciseIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllLogsByExerciseIdQuery, AllLogsByExerciseIdQueryVariables>(AllLogsByExerciseIdDocument, options);
      }
export function useAllLogsByExerciseIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLogsByExerciseIdQuery, AllLogsByExerciseIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllLogsByExerciseIdQuery, AllLogsByExerciseIdQueryVariables>(AllLogsByExerciseIdDocument, options);
        }
export type AllLogsByExerciseIdQueryHookResult = ReturnType<typeof useAllLogsByExerciseIdQuery>;
export type AllLogsByExerciseIdLazyQueryHookResult = ReturnType<typeof useAllLogsByExerciseIdLazyQuery>;
export type AllLogsByExerciseIdQueryResult = Apollo.QueryResult<AllLogsByExerciseIdQuery, AllLogsByExerciseIdQueryVariables>;
export const ChartDataOfXMonthsByExerciseIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"chartDataOfXMonthsByExerciseId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"months"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTimeString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chartDataOfXMonthsByExerciseId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"exerciseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"exerciseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"months"},"value":{"kind":"Variable","name":{"kind":"Name","value":"months"}}},{"kind":"Argument","name":{"kind":"Name","value":"zonedDateTimeString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTimeString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLineChartData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLineChartData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLineChartData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthLabel"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}}]} as unknown as DocumentNode;

/**
 * __useChartDataOfXMonthsByExerciseIdQuery__
 *
 * To run a query within a React component, call `useChartDataOfXMonthsByExerciseIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartDataOfXMonthsByExerciseIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartDataOfXMonthsByExerciseIdQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *      months: // value for 'months'
 *      zonedDateTimeString: // value for 'zonedDateTimeString'
 *   },
 * });
 */
export function useChartDataOfXMonthsByExerciseIdQuery(baseOptions: Apollo.QueryHookOptions<ChartDataOfXMonthsByExerciseIdQuery, ChartDataOfXMonthsByExerciseIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChartDataOfXMonthsByExerciseIdQuery, ChartDataOfXMonthsByExerciseIdQueryVariables>(ChartDataOfXMonthsByExerciseIdDocument, options);
      }
export function useChartDataOfXMonthsByExerciseIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChartDataOfXMonthsByExerciseIdQuery, ChartDataOfXMonthsByExerciseIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChartDataOfXMonthsByExerciseIdQuery, ChartDataOfXMonthsByExerciseIdQueryVariables>(ChartDataOfXMonthsByExerciseIdDocument, options);
        }
export type ChartDataOfXMonthsByExerciseIdQueryHookResult = ReturnType<typeof useChartDataOfXMonthsByExerciseIdQuery>;
export type ChartDataOfXMonthsByExerciseIdLazyQueryHookResult = ReturnType<typeof useChartDataOfXMonthsByExerciseIdLazyQuery>;
export type ChartDataOfXMonthsByExerciseIdQueryResult = Apollo.QueryResult<ChartDataOfXMonthsByExerciseIdQuery, ChartDataOfXMonthsByExerciseIdQueryVariables>;
export const MyPreferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myPreference"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myPreference"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Preference"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Preference"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Preference"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weightUnit"}},{"kind":"Field","name":{"kind":"Name","value":"distanceUnit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultRepetitions"}},{"kind":"Field","name":{"kind":"Name","value":"hideUnitSelector"}},{"kind":"Field","name":{"kind":"Name","value":"autoAdjustWorkoutMuscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"timerDuration"}},{"kind":"Field","name":{"kind":"Name","value":"autoStartTimer"}},{"kind":"Field","name":{"kind":"Name","value":"playTimerCompletionSound"}}]}}]} as unknown as DocumentNode;

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
export const MyProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}}]}}]} as unknown as DocumentNode;

/**
 * __useMyProgramsQuery__
 *
 * To run a query within a React component, call `useMyProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProgramsQuery(baseOptions?: Apollo.QueryHookOptions<MyProgramsQuery, MyProgramsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProgramsQuery, MyProgramsQueryVariables>(MyProgramsDocument, options);
      }
export function useMyProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProgramsQuery, MyProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProgramsQuery, MyProgramsQueryVariables>(MyProgramsDocument, options);
        }
export type MyProgramsQueryHookResult = ReturnType<typeof useMyProgramsQuery>;
export type MyProgramsLazyQueryHookResult = ReturnType<typeof useMyProgramsLazyQuery>;
export type MyProgramsQueryResult = Apollo.QueryResult<MyProgramsQuery, MyProgramsQueryVariables>;
export const ProgramByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"programById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Program"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"logGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLogGroup"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLogGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLogGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLog"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useProgramByIdQuery__
 *
 * To run a query within a React component, call `useProgramByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProgramByIdQuery(baseOptions: Apollo.QueryHookOptions<ProgramByIdQuery, ProgramByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramByIdQuery, ProgramByIdQueryVariables>(ProgramByIdDocument, options);
      }
export function useProgramByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramByIdQuery, ProgramByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramByIdQuery, ProgramByIdQueryVariables>(ProgramByIdDocument, options);
        }
export type ProgramByIdQueryHookResult = ReturnType<typeof useProgramByIdQuery>;
export type ProgramByIdLazyQueryHookResult = ReturnType<typeof useProgramByIdLazyQuery>;
export type ProgramByIdQueryResult = Apollo.QueryResult<ProgramByIdQuery, ProgramByIdQueryVariables>;
export const ProgramLogGroupsByProgramIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"programLogGroupsByProgramId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroupsByProgramId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProgramLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProgramLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"subdivisions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programLogGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"intervalSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"cooldownSeconds"}}]}}]} as unknown as DocumentNode;

/**
 * __useProgramLogGroupsByProgramIdQuery__
 *
 * To run a query within a React component, call `useProgramLogGroupsByProgramIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramLogGroupsByProgramIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramLogGroupsByProgramIdQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *   },
 * });
 */
export function useProgramLogGroupsByProgramIdQuery(baseOptions: Apollo.QueryHookOptions<ProgramLogGroupsByProgramIdQuery, ProgramLogGroupsByProgramIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgramLogGroupsByProgramIdQuery, ProgramLogGroupsByProgramIdQueryVariables>(ProgramLogGroupsByProgramIdDocument, options);
      }
export function useProgramLogGroupsByProgramIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramLogGroupsByProgramIdQuery, ProgramLogGroupsByProgramIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgramLogGroupsByProgramIdQuery, ProgramLogGroupsByProgramIdQueryVariables>(ProgramLogGroupsByProgramIdDocument, options);
        }
export type ProgramLogGroupsByProgramIdQueryHookResult = ReturnType<typeof useProgramLogGroupsByProgramIdQuery>;
export type ProgramLogGroupsByProgramIdLazyQueryHookResult = ReturnType<typeof useProgramLogGroupsByProgramIdLazyQuery>;
export type ProgramLogGroupsByProgramIdQueryResult = Apollo.QueryResult<ProgramLogGroupsByProgramIdQuery, ProgramLogGroupsByProgramIdQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BiometricsLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BiometricsLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logDate"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CognitoUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CognitoUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"given_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"family_name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"cognitoUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CognitoUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BiometricsLog"}}]}}]}}]} as unknown as DocumentNode;

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
export const ChartDataMuscleGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"chartDataMuscleGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chartDataMuscleGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zonedDateTimeString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuscleGroupChartData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuscleGroupChartData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuscleGroupChartData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroup"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]} as unknown as DocumentNode;

/**
 * __useChartDataMuscleGroupsQuery__
 *
 * To run a query within a React component, call `useChartDataMuscleGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartDataMuscleGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartDataMuscleGroupsQuery({
 *   variables: {
 *      zonedDateTime: // value for 'zonedDateTime'
 *   },
 * });
 */
export function useChartDataMuscleGroupsQuery(baseOptions: Apollo.QueryHookOptions<ChartDataMuscleGroupsQuery, ChartDataMuscleGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChartDataMuscleGroupsQuery, ChartDataMuscleGroupsQueryVariables>(ChartDataMuscleGroupsDocument, options);
      }
export function useChartDataMuscleGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChartDataMuscleGroupsQuery, ChartDataMuscleGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChartDataMuscleGroupsQuery, ChartDataMuscleGroupsQueryVariables>(ChartDataMuscleGroupsDocument, options);
        }
export type ChartDataMuscleGroupsQueryHookResult = ReturnType<typeof useChartDataMuscleGroupsQuery>;
export type ChartDataMuscleGroupsLazyQueryHookResult = ReturnType<typeof useChartDataMuscleGroupsLazyQuery>;
export type ChartDataMuscleGroupsQueryResult = Apollo.QueryResult<ChartDataMuscleGroupsQuery, ChartDataMuscleGroupsQueryVariables>;
export const CountTotalTimeWorkoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"countTotalTimeWorkouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countTotalTimeAllMyWorkoutsInMinutes"}}]}}]} as unknown as DocumentNode;

/**
 * __useCountTotalTimeWorkoutsQuery__
 *
 * To run a query within a React component, call `useCountTotalTimeWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountTotalTimeWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountTotalTimeWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountTotalTimeWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<CountTotalTimeWorkoutsQuery, CountTotalTimeWorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountTotalTimeWorkoutsQuery, CountTotalTimeWorkoutsQueryVariables>(CountTotalTimeWorkoutsDocument, options);
      }
export function useCountTotalTimeWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountTotalTimeWorkoutsQuery, CountTotalTimeWorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountTotalTimeWorkoutsQuery, CountTotalTimeWorkoutsQueryVariables>(CountTotalTimeWorkoutsDocument, options);
        }
export type CountTotalTimeWorkoutsQueryHookResult = ReturnType<typeof useCountTotalTimeWorkoutsQuery>;
export type CountTotalTimeWorkoutsLazyQueryHookResult = ReturnType<typeof useCountTotalTimeWorkoutsLazyQuery>;
export type CountTotalTimeWorkoutsQueryResult = Apollo.QueryResult<CountTotalTimeWorkoutsQuery, CountTotalTimeWorkoutsQueryVariables>;
export const CountWorkoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"countWorkouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countMyWorkouts"}}]}}]} as unknown as DocumentNode;

/**
 * __useCountWorkoutsQuery__
 *
 * To run a query within a React component, call `useCountWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<CountWorkoutsQuery, CountWorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountWorkoutsQuery, CountWorkoutsQueryVariables>(CountWorkoutsDocument, options);
      }
export function useCountWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountWorkoutsQuery, CountWorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountWorkoutsQuery, CountWorkoutsQueryVariables>(CountWorkoutsDocument, options);
        }
export type CountWorkoutsQueryHookResult = ReturnType<typeof useCountWorkoutsQuery>;
export type CountWorkoutsLazyQueryHookResult = ReturnType<typeof useCountWorkoutsLazyQuery>;
export type CountWorkoutsQueryResult = Apollo.QueryResult<CountWorkoutsQuery, CountWorkoutsQueryVariables>;
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
export const WorkoutByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"workoutById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workoutById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutLong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Exercise"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Exercise"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryMuscles"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAppliedWeight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"repetitions"}},{"kind":"Field","name":{"kind":"Name","value":"logValue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warmup"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"workout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupedExerciseLog"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupedExerciseLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Exercise"}}]}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExerciseLog"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"base"}},{"kind":"Field","name":{"kind":"Name","value":"fraction"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutLong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"groupedExerciseLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupedExerciseLog"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"externalHealthProviderData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appleHealthId"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]} as unknown as DocumentNode;

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
export const WorkoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"workouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myWorkouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;

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
export const WorkoutsOfMonthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"workoutsOfMonth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workoutsOfCurrentMonth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zonedDateTimeString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zonedDateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkoutShort"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkoutShort"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workout"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCaloriesBurned"}}]}}]} as unknown as DocumentNode;

/**
 * __useWorkoutsOfMonthQuery__
 *
 * To run a query within a React component, call `useWorkoutsOfMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutsOfMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutsOfMonthQuery({
 *   variables: {
 *      zonedDateTime: // value for 'zonedDateTime'
 *   },
 * });
 */
export function useWorkoutsOfMonthQuery(baseOptions: Apollo.QueryHookOptions<WorkoutsOfMonthQuery, WorkoutsOfMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutsOfMonthQuery, WorkoutsOfMonthQueryVariables>(WorkoutsOfMonthDocument, options);
      }
export function useWorkoutsOfMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutsOfMonthQuery, WorkoutsOfMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutsOfMonthQuery, WorkoutsOfMonthQueryVariables>(WorkoutsOfMonthDocument, options);
        }
export type WorkoutsOfMonthQueryHookResult = ReturnType<typeof useWorkoutsOfMonthQuery>;
export type WorkoutsOfMonthLazyQueryHookResult = ReturnType<typeof useWorkoutsOfMonthLazyQuery>;
export type WorkoutsOfMonthQueryResult = Apollo.QueryResult<WorkoutsOfMonthQuery, WorkoutsOfMonthQueryVariables>;