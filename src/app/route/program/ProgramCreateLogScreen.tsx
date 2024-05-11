import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from '../../utils/Constants';
import {
  ExerciseFragment,
  ProgramLogInput,
  useCreateProgramLogMutation,
  useMyExercisesQuery,
  useUpdateProgramLogMutation,
} from '../../graphql/operations';
import usePreferenceStore from '../../stores/preferenceStore';
import AppText from '../../components/common/AppText';
import {defaultStyles} from '../../utils/DefaultStyles';
import Loader from '../../components/common/Loader';
import ProgramLogListItemEditable from '../../components/program/ProgramLogListItemEditable';
import ClickableText from '../../components/common/ClickableText';
import {Add, ArrowDownRight, Delete} from '../../icons/svg';
import AppSegmentedButtons from '../../components/common/AppSegmentedButtons';
import {enumToReadableString, logValueToString} from '../../utils/String';
import {ProgramStackParamList} from '../../stacks/ProgramStack';
import {stripTypenames} from '../../utils/GrahqlUtils';

type Props = NativeStackScreenProps<
  ProgramStackParamList,
  'ProgramCreateLogScreen'
>;

export type ProgramLogAdvancedSettings = {
  separateTimePerSubdivision: boolean;
  enableSubdivisions: boolean;
  timerState: 'disabled' | 'interval' | 'cooldown';
};

const ProgramCreateLogScreen: React.FC<Props> = props => {
  // Constants
  const preferences = usePreferenceStore(state => state.preference);

  const initial: ProgramLogInput = {
    programLogGroupId: props.route.params.programLogGroupId,
    exerciseId: '',
    subdivisions: undefined,
    logValue: {
      base: 0,
      // @ts-ignore
      unit: undefined,
      fraction: undefined,
    },
    repetitions:
      preferences?.defaultRepetitions ?? Constants.DEFAULT_REPETITIONS,
    cooldownSeconds: undefined,
    intervalSeconds: undefined,
    effort: undefined,
  };

  // States
  const [programLogInput, setProgramLogInput] =
    useState<ProgramLogInput>(initial);
  const [myExercises, setMyExercises] = useState<ExerciseFragment[]>([]);
  const [advancedSettings, setAdvancedSettings] =
    useState<ProgramLogAdvancedSettings>({
      separateTimePerSubdivision: false,
      enableSubdivisions: false,
      timerState: 'disabled',
    });

  // Queries
  const {loading: myExercisesLoading} = useMyExercisesQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setMyExercises(data?.myExercises || []);
    },
  });

  // Mutations
  const [createProgramLog] = useCreateProgramLogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.createProgramLog) {
        props.navigation.goBack();
      }
    },
  });

  const [updateProgramLog, {loading: updateProgramLogLoading}] =
    useUpdateProgramLogMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data?.updateProgramLog) {
          props.navigation.goBack();
        }
      },
    });

  // Add subdivision
  const addSubdivision = () => {
    // Duplicate the last subdivision
    const newSubdivisions = [...(programLogInput.subdivisions || [])];
    newSubdivisions.push({
      ...newSubdivisions[newSubdivisions.length - 1],
    });

    const repetitions = newSubdivisions.reduce(
      (prev, curr) => prev + curr.repetitions,
      0,
    );

    const logValue = newSubdivisions
      .map(subDivision => subDivision.logValue)
      .reduce(
        (prev, curr) => {
          const valuePrev = parseFloat(logValueToString(prev));
          const valueCurr = parseFloat(logValueToString(curr));
          const totalValue = valueCurr + valuePrev;

          const fraction = isNaN(totalValue)
            ? undefined
            : parseInt(totalValue.toString().split('.')[1], 10);

          return {
            base: parseInt(totalValue.toString().split('.')[0], 10),
            unit: curr.unit,
            fraction: fraction,
          };
        },
        {
          base: 0,
          unit: programLogInput.logValue.unit,
          fraction: undefined,
        },
      );

    setProgramLogInput(prevState => ({
      ...prevState,
      repetitions,
      logValue,
      subdivisions: newSubdivisions,
    }));
  };

  // Save clicked
  const onSaveClicked = () => {
    // If subdivisions are enabled, remove the exerciseId from the main exercise
    const exerciseId = advancedSettings.enableSubdivisions
      ? undefined
      : programLogInput.exerciseId;
    const subdivisions = advancedSettings.enableSubdivisions
      ? programLogInput.subdivisions
      : undefined;
    const intervalSeconds =
      advancedSettings.enableSubdivisions &&
      advancedSettings.separateTimePerSubdivision
        ? undefined
        : programLogInput.intervalSeconds;
    const cooldownSeconds =
      advancedSettings.enableSubdivisions &&
      advancedSettings.separateTimePerSubdivision
        ? undefined
        : programLogInput.cooldownSeconds;
    const effort = advancedSettings.enableSubdivisions
      ? 0
      : programLogInput.effort;

    if (props.route.params.log?.id) {
      updateProgramLog({
        variables: {
          id: props.route.params.log.id,
          input: stripTypenames({
            ...programLogInput,
            exerciseId,
            subdivisions,
            intervalSeconds,
            cooldownSeconds,
            effort,
          }),
        },
      });
    } else {
      console.log(JSON.stringify(programLogInput));
      createProgramLog({
        variables: {
          input: {
            ...programLogInput,
            exerciseId,
            subdivisions,
            intervalSeconds,
            cooldownSeconds,
            effort,
          },
        },
      });
    }
  };

  // Add initial subdivision if enabled
  useEffect(() => {
    if (
      advancedSettings.enableSubdivisions &&
      (!programLogInput?.subdivisions ||
        programLogInput.subdivisions.length === 0)
    ) {
      // Add new subdivision with same unit as main exercise and 1 repetition
      setProgramLogInput(prevState => ({
        ...prevState,
        subdivisions: [
          {
            ...initial,
            logValue: {
              ...initial.logValue,
              unit: programLogInput.logValue.unit,
            },
            programLogGroupId: '',
            repetitions:
              preferences?.defaultRepetitions ?? Constants.DEFAULT_REPETITIONS,
          },
        ],
      }));
    }
  }, [advancedSettings.enableSubdivisions]);

  // Enable header right button if exercise is correct, else disable
  useEffect(() => {
    const disabled =
      // Repetitions must be larger than 0
      programLogInput.repetitions === 0 ||
      !programLogInput.logValue ||
      !programLogInput.logValue.base ||
      !programLogInput.logValue.unit ||
      (advancedSettings.enableSubdivisions
        ? // Check if all subdivisions are correct, meaning they have an exerciseId, logValue base, repetitions and unit
          !programLogInput.subdivisions?.every(
            sub =>
              sub.exerciseId &&
              sub.logValue &&
              sub.logValue.base > 0 &&
              sub.logValue.unit &&
              sub.logValue.unit === programLogInput.logValue.unit &&
              sub.repetitions > 0,
          )
        : // Check if exerciseId, logValue base, repetitions and unit are correct
          !programLogInput.exerciseId);

    props.navigation.setOptions({
      headerRight: () => (
        <ClickableText
          text={props.route.params.log?.id ? 'Adjust' : 'Save'}
          onPress={onSaveClicked}
          disabled={disabled}
        />
      ),
    });
  }, [programLogInput, props.route.params.log]);

  // Update all the subdivisions units when the main unit is changed
  useEffect(() => {
    if (programLogInput.subdivisions && programLogInput.logValue.unit) {
      const newSubdivisions = programLogInput.subdivisions.map(sub => ({
        ...sub,
        logValue: {
          ...sub.logValue,
          unit: programLogInput.logValue.unit,
        },
      }));
      setProgramLogInput(prevState => ({
        ...prevState,
        subdivisions: newSubdivisions,
      }));
    }
  }, [programLogInput.logValue.unit]);

  // Set initial values if log already exists
  useEffect(() => {
    if (props.route.params.log) {
      props.navigation.setOptions({
        headerTitle: props.route.params.log.id ? 'Adjust Log' : 'Create Log',
      });

      const paramLog = props.route.params.log;
      setProgramLogInput({
        programLogGroupId: paramLog.programLogGroup?.id || '',
        exerciseId: paramLog.exercise?.id || '',
        logValue: paramLog.logValue,
        repetitions: paramLog.repetitions,
        cooldownSeconds: paramLog.cooldownSeconds,
        intervalSeconds: paramLog.intervalSeconds,
        effort: paramLog.effort,
        // @ts-ignore
        subdivisions: paramLog.subdivisions?.map(sub => ({
          exerciseId: sub.exercise?.id || '',
          logValue: sub.logValue,
          repetitions: sub.repetitions,
          cooldownSeconds: sub.cooldownSeconds,
          intervalSeconds: sub.intervalSeconds,
          effort: sub.effort,
        })),
      });

      // Check if subdivisions are enabled
      const enableSubdivisions = !!(
        paramLog.subdivisions && paramLog.subdivisions.length > 0
      );

      setAdvancedSettings({
        // Check if subdivisions are enabled and if they have different cooldown/ interval times
        separateTimePerSubdivision: !!(
          enableSubdivisions &&
          paramLog.subdivisions?.some(
            sub => sub.intervalSeconds || sub.cooldownSeconds,
          )
        ),
        enableSubdivisions,
        timerState:
          paramLog.intervalSeconds ||
          paramLog.subdivisions?.some(sub => sub.intervalSeconds)
            ? 'interval'
            : paramLog.cooldownSeconds ||
              paramLog.subdivisions?.some(sub => sub.cooldownSeconds)
            ? 'cooldown'
            : 'disabled',
      });
    }
  }, [props.route.params.log]);

  const loading = myExercisesLoading || updateProgramLogLoading;

  return (
    <GradientBackground>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={defaultStyles.container}>
          <View style={defaultStyles.marginBottom}>
            <AppText T1 style={defaultStyles.marginBottom}>
              Settings
            </AppText>
            <View style={[styles.border, defaultStyles.padding]}>
              <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
                <View>
                  <AppText xSmall>Divide log into subdivisions</AppText>
                  <AppText xSmall T2>
                    Specify which set of exercises make up 1 log
                  </AppText>
                </View>
                <Switch
                  value={advancedSettings.enableSubdivisions}
                  onValueChange={value => {
                    setAdvancedSettings(prevState => ({
                      ...prevState,
                      enableSubdivisions: value,
                    }));
                  }}
                  ios_backgroundColor={Constants.ERROR_GRADIENT[0]}
                />
              </View>
              {advancedSettings.enableSubdivisions && (
                <View
                  style={[
                    defaultStyles.row,
                    defaultStyles.spaceBetween,
                    defaultStyles.marginTop,
                  ]}>
                  <View>
                    <AppText xSmall>
                      Set cooldown/ interval per subdivision
                    </AppText>
                    <AppText xSmall T2>
                      Set the cooldown or interval for each subdivision
                    </AppText>
                  </View>
                  <Switch
                    value={advancedSettings.separateTimePerSubdivision}
                    onValueChange={value => {
                      setAdvancedSettings(prevState => ({
                        ...prevState,
                        separateTimePerSubdivision: value,
                      }));
                    }}
                    ios_backgroundColor={Constants.ERROR_GRADIENT[0]}
                  />
                </View>
              )}
              <View style={defaultStyles.marginTop}>
                <View>
                  <AppText xSmall>Timer state</AppText>
                  <AppText xSmall T2>
                    Specify if the timer should be disabled, represent an
                    interval, or cooldown
                  </AppText>
                  <View style={defaultStyles.marginTop}>
                    <AppSegmentedButtons
                      buttons={[
                        {
                          label: 'Disabled',
                          value: 'disabled',
                        },
                        {
                          label: 'Interval',
                          value: 'interval',
                        },
                        {
                          label: 'Cooldown',
                          value: 'cooldown',
                        },
                      ]}
                      value={advancedSettings.timerState}
                      onValueChange={value =>
                        setAdvancedSettings(prevState => ({
                          ...prevState,
                          timerState: value as
                            | 'disabled'
                            | 'interval'
                            | 'cooldown',
                        }))
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <AppText
            T1
            style={[defaultStyles.marginBottom, defaultStyles.marginTop]}>
            Program log for {enumToReadableString(props.route.params.type)}
          </AppText>
          <View style={[styles.border, defaultStyles.padding]}>
            <ProgramLogListItemEditable
              programLogInput={programLogInput}
              onExerciseLogChange={setProgramLogInput}
              exercises={
                !advancedSettings.enableSubdivisions ? myExercises : []
              }
              advancedSettings={{
                ...advancedSettings,
                enableSubdivisions: false,
              }}
              showLabels
            />
            {advancedSettings.enableSubdivisions && (
              <>
                {programLogInput.subdivisions?.map((sub, i, array) => (
                  <View
                    style={[defaultStyles.row, defaultStyles.spaceBetween]}
                    key={`view_sub_${i}`}>
                    <View style={[defaultStyles.row, styles.arrowStyle]}>
                      {array.length > 1 && (
                        <TouchableOpacity
                          onPress={() => {
                            const newSubdivisions = [
                              ...(programLogInput.subdivisions || []),
                            ];
                            newSubdivisions.splice(i, 1);

                            const repetitions = newSubdivisions.reduce(
                              (prev, curr) => prev + curr.repetitions,
                              0,
                            );

                            const logValue = newSubdivisions
                              .map(subDivision => subDivision.logValue)
                              .reduce(
                                (prev, curr) => {
                                  const valuePrev = parseFloat(
                                    logValueToString(prev),
                                  );
                                  const valueCurr = parseFloat(
                                    logValueToString(curr),
                                  );
                                  const totalValue = valueCurr + valuePrev;

                                  const fraction = isNaN(totalValue)
                                    ? undefined
                                    : parseInt(
                                        totalValue.toString().split('.')[1],
                                        10,
                                      );

                                  return {
                                    base: parseInt(
                                      totalValue.toString().split('.')[0],
                                      10,
                                    ),
                                    unit: curr.unit,
                                    fraction: fraction,
                                  };
                                },
                                {
                                  base: 0,
                                  unit: programLogInput.logValue.unit,
                                  fraction: undefined,
                                },
                              );

                            setProgramLogInput(prevState => ({
                              ...prevState,
                              repetitions,
                              logValue,
                              subdivisions: newSubdivisions,
                            }));
                          }}>
                          <Delete />
                        </TouchableOpacity>
                      )}
                      <View style={[defaultStyles.rotate90, styles.arrowStyle]}>
                        <ArrowDownRight />
                      </View>
                    </View>
                    <View style={defaultStyles.flex1}>
                      <ProgramLogListItemEditable
                        key={`sub_${i}`}
                        programLogInput={sub}
                        onExerciseLogChange={logInput => {
                          const newSubdivisions = [
                            ...(programLogInput.subdivisions || []),
                          ];
                          newSubdivisions[i] = logInput;

                          const repetitions = newSubdivisions.reduce(
                            (prev, curr) => prev + curr.repetitions,
                            0,
                          );

                          const logValue = newSubdivisions
                            .map(subDivision => subDivision.logValue)
                            .reduce(
                              (prev, curr) => {
                                const valuePrev = parseFloat(
                                  logValueToString(prev),
                                );
                                const valueCurr = parseFloat(
                                  logValueToString(curr),
                                );
                                const totalValue = valueCurr + valuePrev;

                                const fraction = isNaN(totalValue)
                                  ? undefined
                                  : parseInt(
                                      totalValue.toString().split('.')[1],
                                      10,
                                    );

                                return {
                                  base: parseInt(
                                    totalValue.toString().split('.')[0],
                                    10,
                                  ),
                                  unit: curr.unit,
                                  fraction: fraction,
                                };
                              },
                              {
                                base: 0,
                                unit: programLogInput.logValue.unit,
                                fraction: undefined,
                              },
                            );
                          setProgramLogInput(prevState => ({
                            ...prevState,
                            repetitions,
                            logValue,
                            subdivisions: newSubdivisions,
                          }));
                        }}
                        advancedSettings={advancedSettings}
                        exercises={myExercises}
                        showLabels={i === 0}
                      />
                    </View>
                  </View>
                ))}
                <View>
                  <View
                    style={[
                      defaultStyles.separator,
                      defaultStyles.marginBottom,
                    ]}
                  />
                  <TouchableOpacity
                    style={styles.addAlignment}
                    onPress={addSubdivision}>
                    <Add />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  border: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  arrowStyle: {
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  addAlignment: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

export default ProgramCreateLogScreen;
