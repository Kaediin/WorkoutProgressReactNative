import React from 'react';
import {WorkoutShortFragment} from '../../graphql/operations';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {defaultStyles} from '../../utils/DefaultStyles';
import MuscleGroupList from './MuscleGroupList';
import {DATE_TIME_FORMAT} from '../../utils/Date';

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
      style={styles.touchableOpacity}
      onPress={() => onWorkoutPressed(workout.id)}>
      <LinearGradient
        colors={Constants.SECONDARY_GRADIENT}
        style={[
          styles.container,
          hasActiveWorkout ? (workout.active ? {} : styles.inActive) : {},
        ]}>
        <View style={styles.containerHeader}>
          <Text style={styles.activeText}>
            {workout.active ? '• active' : ''}
          </Text>
          <Text style={[defaultStyles.footnote, styles.dateText]}>
            {moment.utc(workout.startDateTime).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
        <Text style={styles.headerText}>{workout.name}</Text>
        {workout.remark && (
          <Text style={[defaultStyles.footnote, defaultStyles.textAlignCenter]}>
            {workout?.remark}
          </Text>
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
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
});

export default WorkoutListItem;
