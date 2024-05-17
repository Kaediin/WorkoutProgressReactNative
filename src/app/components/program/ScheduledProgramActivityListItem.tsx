import React, {useMemo} from 'react';
import {
  ScheduledProgramFragment,
  WorkoutStatus,
} from '../../graphql/operations';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Constants from '../../utils/Constants';
import AppText from '../common/AppText';
import moment from 'moment/moment';
import {
  DATE_TIME_FORMAT,
  getFormattedHoursMinutesString,
} from '../../utils/Date';
import {defaultStyles} from '../../utils/DefaultStyles';
import MuscleGroupList from '../workouts/MuscleGroupList';
import {Fire} from '../../icons/svg';

interface ScheduledProgramActivityListItemProps {
  scheduledProgram: ScheduledProgramFragment;
  onPress: (scheduledProgramId: string) => void;
}

const ScheduledProgramActivityListItem: React.FC<
  ScheduledProgramActivityListItemProps
> = props => {
  const workout = props.scheduledProgram.programWorkout.workout;

  const isReadyToStart = useMemo(() => {
    // Get now in local time
    const now = moment.utc();
    const scheduledDateTime = moment
      .utc(props.scheduledProgram.scheduledDateTime)
      .local(true);

    return (
      workout.status === WorkoutStatus.SCHEDULED &&
      now.isAfter(scheduledDateTime)
    );
  }, [props.scheduledProgram]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !isReadyToStart &&
          workout.status === WorkoutStatus.SCHEDULED && {
            opacity: 0.4,
          },
      ]}
      onPress={() => props.onPress(props.scheduledProgram.id)}>
      <View>
        {isReadyToStart && (
          <AppText style={[defaultStyles.textAlignRight, styles.colorGreen]}>
            • Ready to start
          </AppText>
        )}
        {workout.status === WorkoutStatus.STARTED && (
          <AppText style={styles.colorRed}>• Active</AppText>
        )}
        <AppText h3>{workout.name}</AppText>
        <View style={defaultStyles.marginTop} />
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText T1>Scheduled for</AppText>
          <AppText T1>
            {moment
              .utc(props.scheduledProgram.scheduledDateTime)
              .format(DATE_TIME_FORMAT)}
          </AppText>
        </View>
        {workout.startDateTime && (
          <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
            <AppText T1>Started</AppText>
            <AppText T1>
              {moment.utc(workout.startDateTime).format(DATE_TIME_FORMAT)}
            </AppText>
          </View>
        )}
        {workout.endDateTime && (
          <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
            <AppText T1>Duration</AppText>
            <AppText T1>
              {getFormattedHoursMinutesString(
                workout.startDateTime,
                workout.endDateTime,
              )}
            </AppText>
          </View>
        )}
        {workout.estimatedCaloriesBurned && (
          <View
            style={[
              defaultStyles.row,
              defaultStyles.centerInRow,
              defaultStyles.marginBottom,
            ]}>
            <Fire />
            <AppText>{workout.estimatedCaloriesBurned} kcal</AppText>
          </View>
        )}
        <View style={defaultStyles.marginTop} />
        <MuscleGroupList muscleGroups={workout.muscleGroups} alignCenter />
        <View style={defaultStyles.marginTop} />
        <AppText T2>{workout.remark}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.SECONDARY_GRADIENT[0],
    padding: 20,
    margin: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  colorGreen: {
    color: 'lightgreen',
  },
  colorRed: {
    color: 'red',
  },
});

export default ScheduledProgramActivityListItem;
