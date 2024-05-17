import React, {useEffect, useState} from 'react';
import AppModal from '../common/AppModal';
import {Pressable, StyleSheet, Switch, TextInput, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from '../common/AppText';
import Constants from '../../utils/Constants';
import ClickableText from '../common/ClickableText';
import GradientButton from '../common/GradientButton';
import useAppleHealthKit from '../../hooks/useAppleHealthKit';
import useUserStore from '../../stores/userStore';
import moment from 'moment/moment';
import {
  ExerciseLogFragment,
  useAddEstimatedCaloriesBurnedMutation,
  useEndWorkoutMutation,
  WorkoutLongFragment,
} from '../../graphql/operations';
import Loader from '../common/Loader';
import {getDifferenceInMinutes} from '../../utils/Date';

interface EndWorkoutModalProps {
  visible: boolean;
  onDismiss: () => void;
  workout: WorkoutLongFragment;
  onWorkoutEnded: () => void;
}

const EndWorkoutModal: React.FC<EndWorkoutModalProps> = props => {
  const me = useUserStore(state => state.me);
  const {checkHealthKitStatus, saveWorkoutAppleHealthKit, getCaloriesBurned} =
    useAppleHealthKit();

  const [calorieBurned, setCalorieBurned] = useState(0);
  const [calorieBurnedEditing, setCalorieBurnedEditing] = useState(false);
  const [isHealthKitEnabled, setIsHealthKitEnabled] = useState(false);
  const [overrulePreviousHealthKitSave, setOverrulePreviousHealthKitSave] =
    useState(false);

  // Add calorie burned to workout
  const [addCalorieBurnedToWorkout] = useAddEstimatedCaloriesBurnedMutation({
    fetchPolicy: 'no-cache',
  });
  // End workout
  const [endWorkout, {loading: endWorkoutLoading}] = useEndWorkoutMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.endWorkout) {
        console.log('[WorkoutDetailScreen] Successfully ended workout');

        // Save workout to Apple HealthKit if healthkit is enabled, calories burned is greater than 0 and workout is not already saved in HealthKit or user overrules previous save
        if (
          isHealthKitEnabled &&
          calorieBurned > 0 &&
          ((props.workout.externalHealthProviderData !== undefined &&
            overrulePreviousHealthKitSave) ||
            !props.workout.externalHealthProviderData)
        ) {
          saveWorkoutAppleHealthKit(data.endWorkout, calorieBurned);
        }

        if (calorieBurned > 0) {
          addCalorieBurnedToWorkout({
            variables: {
              workoutId: data.endWorkout.id,
              estimatedCaloriesBurned: calorieBurned,
            },
          });
        }
        props.onWorkoutEnded();
      }
    },
  });

  // Get latest log
  const getLatestCurrentLog = (): ExerciseLogFragment | null => {
    if (!props.workout?.groupedExerciseLogs) {
      return null;
    }
    return [...props.workout.groupedExerciseLogs]
      .flatMap(it => it.logs)
      .sort(
        (a, b) =>
          new Date(b.logDateTime).getTime() - new Date(a.logDateTime).getTime(),
      )[0];
  };

  // Fetch and store HealthKitStatus in state
  useEffect(() => {
    if (props.visible) {
      checkHealthKitStatus().then(setIsHealthKitEnabled);
    }
  }, [props.visible]);

  // If HealthKit is enabled, calculate burned calories
  useEffect(() => {
    const latestLog = getLatestCurrentLog();
    if (isHealthKitEnabled && latestLog && props.workout?.startDateTime) {
      getCaloriesBurned(
        getDifferenceInMinutes(
          props.workout.startDateTime,
          latestLog.logDateTime,
        ),
      ).then(setCalorieBurned);
    }
  }, [isHealthKitEnabled, props.workout?.groupedExerciseLogs, me?.weight]);

  return (
    <AppModal isVisible={props.visible} onDismiss={props.onDismiss}>
      {endWorkoutLoading ? (
        <Loader isLoading />
      ) : (
        <>
          <Pressable
            onPress={() => setCalorieBurnedEditing(false)}
            style={[defaultStyles.container]}>
            <AppText h4 centerText>
              Are you sure you want to end this workout?
            </AppText>

            {isHealthKitEnabled && (
              <View style={defaultStyles.marginTop}>
                {props.workout.externalHealthProviderData && (
                  <View>
                    <AppText xSmall centerText>
                      This workout is already saved in Apple HealthKit. If you
                      wish to save this workout again, please remove the first
                      save from Apple Health first to prevent a double entry.
                    </AppText>
                    <View
                      style={[
                        defaultStyles.row,
                        defaultStyles.centerInRow,
                        defaultStyles.marginTop,
                      ]}>
                      <Switch
                        value={overrulePreviousHealthKitSave}
                        onValueChange={setOverrulePreviousHealthKitSave}
                        ios_backgroundColor={Constants.ERROR_GRADIENT[0]}
                      />
                      <View style={defaultStyles.marginHorizontal}>
                        <AppText>I wish to sync this workout again.</AppText>
                      </View>
                    </View>
                  </View>
                )}
                {((props.workout.externalHealthProviderData &&
                  overrulePreviousHealthKitSave) ||
                  !props.workout.externalHealthProviderData) &&
                  me?.weight?.value && (
                    <View style={defaultStyles.marginTop}>
                      <AppText centerText>Estimated burned calories</AppText>
                      <View
                        style={[
                          defaultStyles.row,
                          defaultStyles.justifyCenter,
                          defaultStyles.marginTop,
                        ]}>
                        {calorieBurnedEditing ? (
                          <TextInput
                            autoFocus
                            defaultValue={calorieBurned.toString()}
                            style={defaultStyles.whiteTextColor}
                            keyboardType={'numeric'}
                            cursorColor={'white'}
                            placeholder={''}
                            maxLength={4}
                            onBlur={() => setCalorieBurnedEditing(false)}
                            onChangeText={text => {
                              // Check if text is a number
                              if (!isNaN(parseInt(text, 10))) {
                                setCalorieBurned(parseInt(text, 10));
                              }
                            }}
                          />
                        ) : (
                          <ClickableText
                            text={calorieBurned.toString()}
                            onPress={() =>
                              setCalorieBurnedEditing(!calorieBurnedEditing)
                            }
                          />
                        )}
                        <AppText> kcal</AppText>
                      </View>
                      <AppText
                        xSmall
                        centerText
                        T1
                        style={defaultStyles.marginTop}>
                        The calculation for burned calories was based on the
                        your gender, weight, and workout duration.
                      </AppText>
                    </View>
                  )}
              </View>
            )}
            {!me?.weight?.value && (
              <AppText xSmall centerText>
                To enable the calorie burned feature, please add your weight &
                gender in the settings.
              </AppText>
            )}
            <View style={[defaultStyles.centerInRow, defaultStyles.marginTop]}>
              <View style={defaultStyles.marginBottom}>
                <GradientButton
                  styles={styles.buttonWidth}
                  title={'End workout'}
                  onPress={() => {
                    endWorkout({
                      fetchPolicy: 'no-cache',
                      variables: {
                        workoutId: props.workout.id,
                        zonedDateTimeString: moment().toISOString(true),
                      },
                    });
                  }}
                  gradients={Constants.TERTIARY_GRADIENT}
                />
              </View>
              <ClickableText
                text={'Cancel'}
                onPress={() => props.onDismiss()}
              />
            </View>
          </Pressable>
        </>
      )}
    </AppModal>
  );
};

const styles = StyleSheet.create({
  buttonWidth: {
    width: 200,
  },
});

export default EndWorkoutModal;
