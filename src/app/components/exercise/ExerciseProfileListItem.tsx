import React from 'react';
import {ExerciseFragment} from '../../graphql/operations';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';
import MuscleGroupList from '../workouts/MuscleGroupList';
import {nonNullable} from '../../utils/List';
import {logValueToString} from '../../utils/String';

interface ExerciseProfileListItemProps {
  exercise: ExerciseFragment;
}

const ExerciseProfileListItem: React.FC<ExerciseProfileListItemProps> = ({
  exercise,
}) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={Constants.SECONDARY_GRADIENT}>
      <Text style={styles.name}>{exercise.name}</Text>
      {exercise.notes && (
        <Text
          style={[
            defaultStyles.textAlignCenter,
            defaultStyles.footnote,
            defaultStyles.marginBottom,
          ]}>
          {exercise.notes}
        </Text>
      )}
      <Text style={[defaultStyles.footnote, defaultStyles.textAlignCenter]}>
        Primary muscle groups
      </Text>
      <MuscleGroupList
        muscleGroups={exercise.primaryMuscles?.filter(nonNullable) || []}
        alignCenter
      />
      {exercise.secondaryMuscles && exercise.secondaryMuscles?.length > 0 && (
        <>
          <Text style={[defaultStyles.footnote, defaultStyles.textAlignCenter]}>
            Secondary muscle groups
          </Text>
          <MuscleGroupList
            muscleGroups={exercise.secondaryMuscles.filter(nonNullable) || []}
            alignCenter
          />
        </>
      )}
      {exercise.defaultAppliedWeight && (
        <Text style={[defaultStyles.p11, defaultStyles.textAlignCenter]}>
          +{logValueToString(exercise.defaultAppliedWeight)}
        </Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: Constants.CONTAINER_PADDING_MARGIN,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});

export default ExerciseProfileListItem;
