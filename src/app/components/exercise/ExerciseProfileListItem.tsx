import React from 'react';
import {ExerciseFragment} from '../../graphql/operations';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {defaultStyles} from '../../utils/DefaultStyles';
import MuscleGroupList from '../workouts/MuscleGroupList';
import {nonNullable} from '../../utils/List';
import {logValueToString} from '../../utils/String';
import AppText from '../common/AppText';

interface ExerciseProfileListItemProps {
  exercise: ExerciseFragment;
  onPress: (exerciseId: string) => void;
}

const ExerciseProfileListItem: React.FC<ExerciseProfileListItemProps> = ({
  exercise,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(exercise.id)}>
      <LinearGradient
        style={styles.container}
        colors={Constants.SECONDARY_GRADIENT}>
        <AppText style={styles.name}>{exercise.name}</AppText>
        {exercise.notes && (
          <AppText
            style={[
              defaultStyles.textAlignCenter,
              defaultStyles.footnote,
              defaultStyles.marginTop,
              defaultStyles.marginBottom,
            ]}>
            {exercise.notes}
          </AppText>
        )}
        <AppText
          style={[defaultStyles.footnote, defaultStyles.textAlignCenter]}>
          Primary muscle groups
        </AppText>
        <MuscleGroupList
          muscleGroups={exercise.primaryMuscles?.filter(nonNullable) || []}
          alignCenter
        />
        {exercise.secondaryMuscles && exercise.secondaryMuscles?.length > 0 && (
          <>
            <AppText
              style={[defaultStyles.footnote, defaultStyles.textAlignCenter]}>
              Secondary muscle groups
            </AppText>
            <MuscleGroupList
              muscleGroups={exercise.secondaryMuscles.filter(nonNullable) || []}
              alignCenter
            />
          </>
        )}
        {exercise.defaultAppliedWeight && (
          <AppText style={[defaultStyles.p11, defaultStyles.textAlignCenter]}>
            +{logValueToString(exercise.defaultAppliedWeight)}
          </AppText>
        )}
      </LinearGradient>
    </TouchableOpacity>
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
