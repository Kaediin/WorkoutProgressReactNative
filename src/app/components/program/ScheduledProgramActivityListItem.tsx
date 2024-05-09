import React, {useMemo} from 'react';
import {
  ScheduledProgramFragment,
  WorkoutStatus,
} from '../../graphql/operations';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Constants from '../../utils/Constants';
import AppText from '../common/AppText';
import moment from 'moment/moment';
import {DATE_TIME_FORMAT} from '../../utils/Date';
import {defaultStyles} from '../../utils/DefaultStyles';
import MuscleGroupList from '../workouts/MuscleGroupList';

interface ScheduledProgramActivityListItemProps {
  scheduledProgram: ScheduledProgramFragment;
  onPress: (scheduledProgramId: string) => void;
}

const ScheduledProgramActivityListItem: React.FC<
  ScheduledProgramActivityListItemProps
> = props => {
  const isOverdue = useMemo(() => {
    // Get now in local time
    const now = moment.utc();
    const scheduledDateTime = moment
      .utc(props.scheduledProgram.scheduledDateTime)
      .local(true);

    return (
      props.scheduledProgram.workout.status === WorkoutStatus.SCHEDULED &&
      now.isAfter(scheduledDateTime)
    );
  }, [props.scheduledProgram]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onPress(props.scheduledProgram.program.id)}>
      <View>
        {isOverdue && (
          <AppText style={[defaultStyles.textAlignRight, styles.colorGreen]}>
            • Ready to start
          </AppText>
        )}
        <AppText h3>{props.scheduledProgram.workout.name}</AppText>
        <View style={defaultStyles.marginTop} />
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText T1>Program</AppText>
          <AppText T1>{props.scheduledProgram.program.name}</AppText>
        </View>
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText T1>Scheduled for</AppText>
          <AppText T1>
            {moment
              .utc(props.scheduledProgram.scheduledDateTime)
              .format(DATE_TIME_FORMAT)}
          </AppText>
        </View>
        <View style={defaultStyles.marginTop} />
        <MuscleGroupList
          muscleGroups={props.scheduledProgram.workout.muscleGroups}
          alignCenter
        />
        <View style={defaultStyles.marginTop} />
        <AppText T2>{props.scheduledProgram.workout.remark}</AppText>
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
});

export default ScheduledProgramActivityListItem;
