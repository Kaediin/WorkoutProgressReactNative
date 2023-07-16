import React from 'react';
import {ExerciseFragment, MuscleGroup} from '../../graphql/operations';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

interface SelectExerciseProps {
  onSelect: (exercise: ExerciseFragment) => void;
  exercises: ExerciseFragment[];
  selectedId: string;
  onCreateExerciseClick: () => void;
  sortByMuscleGroups?: MuscleGroup[];
}

const SelectExerciseGroups: React.FC<SelectExerciseProps> = props => {
  return (
    <ScrollView>
      <View>
        <Button
          title={'Create new exercise'}
          onPress={props.onCreateExerciseClick}
        />
      </View>
      <ScrollView style={styles.selectContainer} horizontal>
        {props.exercises.map((exercise, index) => {
          const isSelected = props.selectedId === exercise?.id;
          return (
            <LinearGradient
              colors={
                isSelected
                  ? Constants.SECONDARY_GRADIENT
                  : Constants.PRIMARY_GRADIENT
              }
              style={styles.muscleGroupContainer}
              key={index}>
              <TouchableOpacity onPress={() => props.onSelect(exercise)}>
                <Text style={styles.muscleGroupText}>{exercise.name}</Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectContainer: {},
  muscleGroupContainer: {
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    width: 100,
    margin: 5,
    paddingHorizontale: 5,
    justifyContent: 'center',
  },
  muscleGroupText: {
    paddingVertical: Constants.CONTAINER_PADDING,
    textAlign: 'center',
    color: 'white',
  },
});

export default SelectExerciseGroups;
