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

interface ScheduledProgramActivityListItemProps {
  scheduledProgram: ScheduledProgramFragment;
  onPress: (scheduledProgramId: string) => void;
}

const ScheduledProgramActivityListItem: React.FC<
  ScheduledProgramActivityListItemProps
> = props => {
  const isReadyToStart = useMemo(() => {
    // Get now in local time
    const now = moment.utc();
    const scheduledDateTime = moment
      .utc(props.scheduledProgram.scheduledDateTime)
      .local(true);

    return (
      props.scheduledProgram.programWorkout.workout.status ===
        WorkoutStatus.SCHEDULED && now.isAfter(scheduledDateTime)
    );
  }, [props.scheduledProgram]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !isReadyToStart &&
          props.scheduledProgram.programWorkout.workout.status ===
            WorkoutStatus.SCHEDULED && {
            opacity: 0.4,
          },
      ]}
      onPress={() =>
        props.onPress(props.scheduledProgram.programWorkout.program.id)
      }>
      <View>
        {isReadyToStart && (
          <AppText style={[defaultStyles.textAlignRight, styles.colorGreen]}>
            • Ready to start
          </AppText>
        )}
        {props.scheduledProgram.programWorkout.workout.status ===
          WorkoutStatus.STARTED && (
          <AppText style={styles.colorRed}>• Active</AppText>
        )}
        <AppText h3>
          {props.scheduledProgram.programWorkout.workout.name}
        </AppText>
        <View style={defaultStyles.marginTop} />
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText T1>Program</AppText>
          <AppText T1>
            {props.scheduledProgram.programWorkout.program.name}
          </AppText>
        </View>
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText T1>Scheduled for</AppText>
          <AppText T1>
            {moment
              .utc(props.scheduledProgram.scheduledDateTime)
              .format(DATE_TIME_FORMAT)}
          </AppText>
        </View>
        {props.scheduledProgram.programWorkout.workout.startDateTime && (
          <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
            <AppText T1>Started</AppText>
            <AppText T1>
              {moment
                .utc(
                  props.scheduledProgram.programWorkout.workout.startDateTime,
                )
                .format(DATE_TIME_FORMAT)}
            </AppText>
          </View>
        )}
        {props.scheduledProgram.programWorkout.workout.endDateTime && (
          <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
            <AppText T1>Duration</AppText>
            <AppText T1>
              {getFormattedHoursMinutesString(
                props.scheduledProgram.programWorkout.workout.startDateTime,
                props.scheduledProgram.programWorkout.workout.endDateTime,
              )}
            </AppText>
          </View>
        )}
        <View style={defaultStyles.marginTop} />
        <MuscleGroupList
          muscleGroups={
            props.scheduledProgram.programWorkout.workout.muscleGroups
          }
          alignCenter
        />
        <View style={defaultStyles.marginTop} />
        <AppText T2>
          {props.scheduledProgram.programWorkout.workout.remark}
        </AppText>
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
