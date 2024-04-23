import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityStackParamList} from '../../../stacks/ActivityStack';
import GradientBackground from '../../../components/common/GradientBackground';
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from '../../../utils/Constants';
import {
  ExerciseFragment,
  ProgramLogInput,
  useMyExercisesQuery,
} from '../../../graphql/operations';
import usePreferenceStore from '../../../stores/preferenceStore';
import AppText from '../../../components/common/AppText';
import {defaultStyles} from '../../../utils/DefaultStyles';
import Loader from '../../../components/common/Loader';
import ProgramLogListItemEditable from '../../../components/program/ProgramLogListItemEditable';
import ClickableText from '../../../components/common/ClickableText';
import {Add, ArrowDownRight, Delete} from '../../../icons/svg';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ProgramCreateLog'>;

const ProgramCreateLogScreen: React.FC<Props> = props => {
  // Constants
  const preferences = usePreferenceStore(state => state.preference);

  const initial: ProgramLogInput = {
    programLogGroupId: props.route.params.programId,
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
  const [separateTimePerSubdivision, setSeparateTimePerSubdivision] =
    useState(false);
  const [enableSubdivisions, setEnableSubdivisions] = useState(false);
  const [exerciseLog, setExerciseLog] = useState<ProgramLogInput>(initial);
  const [myExercises, setMyExercises] = useState<ExerciseFragment[]>([]);

  // Queries
  const {loading: myExercisesLoading} = useMyExercisesQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setMyExercises(data?.myExercises || []);
    },
  });

  // Add subdivision
  const addSubdivision = () => {
    // Add new subdivision with same unit as main exercise and 1 repetition
    setExerciseLog(prevState => ({
      ...prevState,
      subdivisions: [
        ...(prevState.subdivisions || []),
        {
          ...initial,
          logValue: {
            ...initial.logValue,
            unit: exerciseLog.logValue.unit,
          },
          repetitions: 1,
        },
      ],
    }));
  };

  // Add initial subdivision if enabled
  useEffect(() => {
    if (
      enableSubdivisions &&
      (!exerciseLog?.subdivisions || exerciseLog.subdivisions.length === 0)
    ) {
      // Add new subdivision with same unit as main exercise and 1 repetition
      setExerciseLog(prevState => ({
        ...prevState,
        subdivisions: [
          {
            ...initial,
            logValue: {
              ...initial.logValue,
              unit: exerciseLog.logValue.unit,
            },
            repetitions: 1,
          },
        ],
      }));
    }
  }, [enableSubdivisions]);

  // Enable header right button if exercise is correct, else disable
  useEffect(() => {
    const disabled =
      // Repetitions must be larger than 0
      exerciseLog.repetitions === 0 ||
      !exerciseLog.logValue ||
      !exerciseLog.logValue.base ||
      !exerciseLog.logValue.unit ||
      (enableSubdivisions
        ? // Check if all subdivisions are correct, meaning they have an exerciseId, logValue base, repetitions and unit
          !exerciseLog.subdivisions?.every(
            sub =>
              sub.exerciseId &&
              sub.logValue &&
              sub.logValue.base > 0 &&
              sub.logValue.unit &&
              sub.logValue.unit === exerciseLog.logValue.unit &&
              sub.repetitions > 0,
          )
        : // Check if exerciseId, logValue base, repetitions and unit are correct
          !exerciseLog.exerciseId);

    props.navigation.setOptions({
      headerRight: () => (
        <ClickableText text={'Next'} onPress={() => {}} disabled={disabled} />
      ),
    });
  }, [exerciseLog]);

  // Update all the subdivisions units when the main unit is changed
  useEffect(() => {
    if (exerciseLog.subdivisions && exerciseLog.logValue.unit) {
      console.log('Updating subdivisions');
      const newSubdivisions = exerciseLog.subdivisions.map(sub => ({
        ...sub,
        logValue: {
          ...sub.logValue,
          unit: exerciseLog.logValue.unit,
        },
      }));
      setExerciseLog(prevState => ({
        ...prevState,
        subdivisions: newSubdivisions,
      }));
    }
  }, [exerciseLog.logValue.unit]);

  const loading = myExercisesLoading;

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
                  value={enableSubdivisions}
                  onValueChange={setEnableSubdivisions}
                  ios_backgroundColor={Constants.ERROR_GRADIENT[0]}
                />
              </View>
              {enableSubdivisions && (
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
                    value={separateTimePerSubdivision}
                    onValueChange={setSeparateTimePerSubdivision}
                    ios_backgroundColor={Constants.ERROR_GRADIENT[0]}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={[styles.border, defaultStyles.padding]}>
            <ProgramLogListItemEditable
              exerciseLog={exerciseLog}
              onExerciseLogChange={setExerciseLog}
              exercises={!enableSubdivisions ? myExercises : []}
              showLabels
            />
            {enableSubdivisions && (
              <>
                {exerciseLog.subdivisions?.map((sub, i) => (
                  <View
                    style={[defaultStyles.row, defaultStyles.spaceBetween]}
                    key={`view_sub_${i}`}>
                    <View style={defaultStyles.row}>
                      <TouchableOpacity
                        onPress={() => {
                          const newSubdivisions = [
                            ...(exerciseLog.subdivisions || []),
                          ];
                          newSubdivisions.splice(i, 1);
                          setExerciseLog(prevState => ({
                            ...prevState,
                            subdivisions: newSubdivisions,
                          }));
                        }}>
                        <Delete />
                      </TouchableOpacity>
                      <View style={[defaultStyles.rotate90, styles.arrowStyle]}>
                        <ArrowDownRight />
                      </View>
                    </View>
                    <View style={defaultStyles.flex1}>
                      <ProgramLogListItemEditable
                        key={`sub_${i}`}
                        exerciseLog={sub}
                        onExerciseLogChange={logInput => {
                          const newSubdivisions = [
                            ...(exerciseLog.subdivisions || []),
                          ];
                          newSubdivisions[i] = logInput;
                          setExerciseLog(prevState => ({
                            ...prevState,
                            subdivisions: newSubdivisions,
                          }));
                        }}
                        exercises={myExercises}
                        showLabels={i === 0}
                        isSubdivision
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
