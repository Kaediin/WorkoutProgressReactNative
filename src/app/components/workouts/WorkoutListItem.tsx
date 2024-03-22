import React from 'react';
import {WorkoutShortFragment} from '../../graphql/operations';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {defaultStyles} from '../../utils/DefaultStyles';
import MuscleGroupList from './MuscleGroupList';
import {
  DATE_TIME_FORMAT,
  getFormattedHoursMinutesString,
} from '../../utils/Date';
import AppText from '../common/AppText';

interface WorkoutListItemProps {
  workout: WorkoutShortFragment;
  onWorkoutPressed: (id: string) => void;
  hasActiveWorkout: boolean;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({
  workout,
  onWorkoutPressed,
  hasActiveWorkout,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.touchableOpacity,
        defaultStyles.shadow,
        hasActiveWorkout ? (workout.active ? defaultStyles.shadow : {}) : {},
      ]}
      onPress={() => onWorkoutPressed(workout.id)}>
      <LinearGradient
        colors={Constants.SECONDARY_GRADIENT}
        style={[
          styles.container,
          hasActiveWorkout ? (workout.active ? {} : styles.inActive) : {},
        ]}>
        <View style={styles.containerHeader}>
          <AppText style={styles.activeText}>
            {workout.active ? '• active' : ''}
          </AppText>
          <AppText style={[defaultStyles.footnote, styles.dateText]}>
            {moment.utc(workout.startDateTime).format(DATE_TIME_FORMAT)}
            {workout.endDateTime &&
              ' (' +
                getFormattedHoursMinutesString(
                  workout.startDateTime,
                  workout.endDateTime,
                ) +
                ')'}
          </AppText>
        </View>
        <AppText style={styles.headerText}>{workout.name}</AppText>
        {workout.remark && (
          <AppText
            style={[defaultStyles.footnote, defaultStyles.textAlignCenter]}>
            {workout?.remark}
          </AppText>
        )}
        <MuscleGroupList muscleGroups={workout.muscleGroups} alignCenter />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL, // Needed for ContextAction Styling
  },
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
  inActive: {
    opacity: 0.4,
  },
  activeText: {
    color: 'red',
  },
  dateText: {
    textAlign: 'right',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
});

export default WorkoutListItem;
